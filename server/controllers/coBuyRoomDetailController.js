const db = require("../models/index"),
  moment = require("moment"),
  CoBuyingRoom = db.cobuying_room,
  Sell = db.sell,
  Product = db.product,
  Image = db.image,
  DepositForm = db.deposit_form,
  User = db.user,
  DemandUser = db.demand_user,
  ChatMessage = db.chat_message,
  ChatRoom = db.chatroom,
  Notification = db.notification,
  UpdatePost = db.update_post;

const { where } = require("sequelize");
const verifyAuthController = require("./verifyAuthController");
const update_post = require("../models/update_post");

module.exports = {
  index: async (req, res, next) => {
    try {
      // 쿼리스트링으로 id를 받아 해당하는 공구방 데이터를 꺼내 사용한다
      const coBuyingRoomID = req.params.id;

      const cobuyroom = await CoBuyingRoom.findByPk(coBuyingRoomID);
      const sell = await Sell.findOne({
        where: {
          cobuying_room_id: coBuyingRoomID,
        },
      });
      const product = await Product.findOne({
        where: {
          id: sell.product_id,
        },
      });
      const image = await Image.findOne({
        where: {
          product_id: product.id,
        },
      });
      const depositForm = await DepositForm.findOne({
        where: {
          id: coBuyingRoomID,
        },
      });

      let imgURL = image.url;
      imgURL = imgURL.replace("public\\", "");
      imgURL = imgURL.replace("\\", "/");
      imgURL = "/" + imgURL;

      // textarea의 개행 문자를 div의 개행문자로 변환하여 저장
      cobuyroom_description = cobuyroom.description;
      cobuyroom_description = cobuyroom_description.replace(/\n/g, "<br>");

      // ejs에서 비교할 로그인 아이디
      // 현재유저 로그인 아이디 불러오기
      current_user = await verifyAuthController.checkID(req);
      current_user_id = current_user.dataValues.login_id;

      // 공구방 주최 유저 로그인 아이디 불러오기
      const user = await User.findByPk(cobuyroom.host_id);
      host_user_id = user.login_id;

      // 날짜 처리
      let now, end_at, remaining_days;

      if (depositForm != null) {
        now = moment();
        end_at = moment(depositForm.end_at);
        remaining_days = end_at.diff(now, "days");
      } else {
        remaining_days = -1;
      }

      res.locals.cobuyroom = cobuyroom;
      res.locals.cobuyroom_description = cobuyroom_description;
      res.locals.sell = sell;
      res.locals.product = product;
      res.locals.imgURL = imgURL;
      res.locals.depositForm = depositForm;
      res.locals.current_user_id = current_user_id;
      res.locals.host_user_id = host_user_id;
      res.locals.remaining_days = remaining_days;
      next();
    } catch (error) {
      console.log(`Error fetching coBuyroomDetail: ${error.message}`);
      next(error);
    }
  },
  indexView: async (req, res) => {
    res.render("CoBuyRoom/detail");
  },
  chatting: (req, res) => {
    res.render("CoBuyRoom/chatting");
  },
  // 살래요 버튼 클릭시
  updateCurrentDemand: async (req, res, next) => {
    // current_demand 업데이트
    const coBuyingRoomID = req.params.id;
    current_user = await verifyAuthController.checkID(req);
    current_user_id = current_user.dataValues.id;

    const sell = await Sell.findOne({
      where: {
        cobuying_room_id: coBuyingRoomID,
      },
    });
    const demand_user = await DemandUser.findOne({
      where: {
        user_id: current_user_id,
        cobuying_room_id: coBuyingRoomID,
      },
    });
    if (demand_user == null) {
      DemandUser.create({
        user_id: current_user_id,
        cobuying_room_id: coBuyingRoomID,
      });
      Sell.increment(
        { current_demand: 1 },
        {
          where: {
            product_id: sell.product_id,
            cobuying_room_id: sell.cobuying_room_id,
          },
        }
      )
        .then(() => {
          // 동일 페이지로 리다이렉트
          res.locals.redirect = `/CoBuyRoom/${coBuyingRoomID}/detail/`;
          next();
        })
        .catch((error) => {
          console.log(`Error fetching coBuyroomDetail: ${error.message}`);
          next(error);
        });
    } else {
      res.locals.redirect = `/CoBuyRoom/${coBuyingRoomID}/detail/`;
      next();
    }
  },
  deleteCoBuyRoom: async (req, res, next) => {
    const coBuyingRoomID = req.params.id;
    const productIDobject = await Sell.findOne({
      raw: true,
      attributes: ['product_id'],
      where: {
        cobuying_room_id: coBuyingRoomID
      }
    });
    const productID = Object.values(productIDobject);

    await Notification.destroy({
      where: {
        cobuying_room_id: coBuyingRoomID
      }
    });
    await UpdatePost.destroy({
      where: {
        cobuying_room_id: coBuyingRoomID
      }
    });
    await ChatMessage.destroy({
      where: {
        cobuying_room_id: coBuyingRoomID
      }
    });
    await ChatRoom.destroy({
      where: {
        cobuying_room_id: coBuyingRoomID
      }
    });
    await DemandUser.destroy({
      where: {
        cobuying_room_id: coBuyingRoomID
      }
    });
    await Image.destroy({
      where: {
        product_id: productID
      }
    });
    await Product.destroy({
      where: {
        id: productID
      }
    });
    await CoBuyingRoom.destroy({
      where: {
        id: coBuyingRoomID
      }
    });
    await Sell.destroy({
      where: {
        cobuying_room_id: coBuyingRoomID,
        product_id: productID
      }
    });

    newGonggus = await db.sequelize.query('SELECT A.*, B.id, B.url, replace(B.url, "public\", "") AS real_url, B.createdAt, B.updatedAt FROM (SELECT A.*, B.name FROM (SELECT A.product_id, A.cobuying_room_id, B.title, A.current_demand, B.createdAt AS cobuying_room_createdAt FROM sell AS A LEFT JOIN cobuying_room AS B ON A.cobuying_room_id=B.id) AS A LEFT JOIN product AS B ON A.product_id=B.id) AS A LEFT JOIN image AS B ON A.product_id=B.product_id ORDER BY cobuying_room_createdAt DESC LIMIT 2;');
    hotGonggus = await db.sequelize.query('SELECT A.*, B.id, B.url, replace(B.url, "public\", "") AS real_url, B.createdAt, B.updatedAt FROM (SELECT A.*, B.name FROM (SELECT A.product_id, A.cobuying_room_id, B.title, A.current_demand FROM sell AS A LEFT JOIN cobuying_room AS B ON A.cobuying_room_id=B.id) AS A LEFT JOIN product AS B ON A.product_id=B.id) AS A LEFT JOIN image AS B ON A.product_id=B.product_id ORDER BY A.current_demand DESC LIMIT 2;');

    if (req.cookies['userToken'] == null) { //토큰이 없다면
      res.render("home/index", { newGonggus: newGonggus[0], hotGonggus: hotGonggus[0], isLoggedin: false });
    } else { //토큰이 있다면
      res.render("home/index", { newGonggus: newGonggus[0], hotGonggus: hotGonggus[0], isLoggedin: true});
    }
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },
};
