const db = require("../models/index"),
  moment = require("moment"),
  CoBuyingRoom = db.cobuying_room,
  Sell = db.sell,
  Product = db.product,
  Image = db.image,
  DepositForm = db.deposit_form,
  User = db.user,
  DemandUser = db.demand_user;

const { where } = require("sequelize");
const verifyAuthController = require("./verifyAuthController");

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
      let now = moment();
      let end_at = moment(depositForm.end_at);
      remaining_days = end_at.diff(now, "days");

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
    //
    // await CoBuyingRoom.destroy({
    //   where: {
    //     id: coBuyingRoomID,
    //   },
    // });
    res.render("home/index");
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },
};
