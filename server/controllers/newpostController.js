const db = require("../models/index"),
  CoBuyingRoom = db.cobuying_room,
  NewPost = db.update_post;

module.exports = {
  index: async (req, res, next) => {
    try {
      // 쿼리스트링으로 id를 받아 해당하는 공구방 데이터를 꺼내 사용한다
      const coBuyingRoomID = req.params.id;

      const cobuyroom = await CoBuyingRoom.findByPk(coBuyingRoomID);
      const newposts = await NewPost.findAll({
        where: {
          cobuying_room_id: coBuyingRoomID,
        },
        order: [["id", "DESC"]],
      });

      res.locals.cobuyroom = cobuyroom;
      res.locals.newposts = newposts;

      next();
    } catch (error) {
      console.log(`Error fetching coBuyRoomNewpost: ${error.message}`);
      next(error);
    }
  },
  indexView: async (req, res) => {
    res.render("CoBuyRoom/newpost", {isLoggedin: true});
  },
};
