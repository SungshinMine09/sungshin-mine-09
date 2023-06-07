const db = require("../models/index"),
  moment = require("moment"),
  CoBuyingRoom = db.cobuying_room,
  NewPost = db.update_post,
  User = db.user;

const verifyAuthController = require("./verifyAuthController");

module.exports = {
  index: async (req, res, next) => {
    try {
      // 쿼리스트링으로 id를 받아 해당하는 공구방 데이터를 꺼내 사용한다
      const coBuyingRoomID = req.params.id;
      const cobuyroom = await CoBuyingRoom.findByPk(coBuyingRoomID);
      const form_id = req.params.form_id;
      const newposts = await NewPost.findAll({
        where: {
          cobuying_room_id: coBuyingRoomID,
        },
        order: [["id", "DESC"]],
      });

      // 날짜 처리
      dates = [];
      newposts.forEach((post) => {
        dates.push(moment(post.createdAt).format("YY/MM/DD HH:MM"));
      });

      current_user = await verifyAuthController.checkID(req);
      current_user_id = current_user.dataValues.login_id;

      const user = await User.findByPk(cobuyroom.host_id);
      host_user_id = user.login_id;

      res.locals.cobuyroom = cobuyroom;
      res.locals.newposts = newposts;
      res.locals.dates = dates;
      res.locals.current_user_id = current_user_id;
      res.locals.host_user_id = host_user_id;

      next();
    } catch (error) {
      console.log(`Error fetching coBuyRoomNewpost: ${error.message}`);
      next(error);
    }
  },
  indexView: async (req, res) => {
    res.render("CoBuyRoom/newpost");
  },
};
