const db = require("../models/index"),
  CoBuyingRoom = db.cobuying_room,
  ChatRoom = db.chatroom,
  ChatMessage = db.chat_message;

module.exports = {
  index: async (req, res, next) => {
    try {
      // 쿼리스트링으로 id를 받아 해당하는 공구방 데이터를 꺼내 사용한다
      const coBuyingRoomID = req.params.id;
      const cobuyroom = await CoBuyingRoom.findByPk(coBuyingRoomID);

      res.locals.cobuyroom = cobuyroom;

      next();
    } catch (error) {
      console.log(`Error fetching coBuyRoomCreatePost: ${error.message}`);
      next(error);
    }
  },
  indexView: async (req, res) => {
    res.render("CoBuyRoom/chatting");
  },
};
