const db = require("../models/index"),
  Sequelize = require("sequelize"),
  moment = require("moment"),
  CoBuyingRoom = db.cobuying_room,
  ChatRoom = db.chatroom,
  ChatMessage = db.chat_message,
  User = db.user,
  Notification = db.notifications;

const verifyAuthController = require("./verifyAuthController");

module.exports = {
  index: async (req, res, next) => {
    try {
      const coBuyingRoomID = req.params.id;
      const cobuyroom = await CoBuyingRoom.findByPk(coBuyingRoomID);

      // 주최자/일반유저 여부 확인
      user = await verifyAuthController.checkID(req);
      user_id = user.dataValues.id;
      user_login_id = user.dataValues.login_id;
      is_room_creater = false; // 주최자 여부

      if (user_id == cobuyroom.host_id) is_room_creater = true; // true가 맞음 testing중에만 false

      let chatroom_using;
      // ---------------접속유저가 일반유저인 경우---------------------
      // 접속유저가 속해있는 채팅방을 찾는다
      if (!is_room_creater) {
        chatroom_using = await ChatRoom.findOne({
          where: {
            cobuying_room_id: coBuyingRoomID,
            guest_id: user_id,
          },
        });
        // 접속유저가 속해있는 채팅방이 없다면, 채팅방 생성
        if (!chatroom_using) {
          chatroom_using = await ChatRoom.create({
            cobuying_room_id: coBuyingRoomID,
            host_id: cobuyroom.host_id,
            guest_id: user_id,
          });
        }
      }
      // 주최자 로그인 아이디 가져오기
      const creator = await User.findByPk(cobuyroom.host_id);

      // ---------------접속유저가 주최자인 경우---------------------
      // 해당 공구방의 모든 채팅방 불러오기
      if (is_room_creater) {
        chatrooms = await ChatRoom.findAll({
          where: {
            cobuying_room_id: coBuyingRoomID,
          },
          order: [["id", "desc"]],
        });
        chatroom_using = chatrooms[0]; // 최상위 공구방 보여주기
      }

      // -----------------------------------------------------------
      // 채팅 메세지 내역 가져오기
      let messages;
      dates = [];
      if (chatroom_using) {
        messages = await ChatMessage.findAll({
          where: {
            chatroom_id: chatroom_using.id,
          },
        });
        messages.forEach((message) => {
          dates.push(moment(message.createdAt).format("YY/MM/DD HH:mm"));
        });
      }

      // 유저 아이디 목록
      const query = "SELECT user.login_id FROM chatroom JOIN user ON chatroom.guest_id=user.id WHERE chatroom.cobuying_room_id=" + coBuyingRoomID;
      const chatUserLoginIds = await db.sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
      console.log(chatUserLoginIds);

      res.locals.cobuyroom = cobuyroom;
      res.locals.chatroom_using = chatroom_using;
      res.locals.is_room_creater = is_room_creater;
      res.locals.user_login_id = user_login_id;
      res.locals.user_id = user_id;
      res.locals.creator = creator;
      res.locals.messages = messages;
      res.locals.dates = dates;
      res.locals.chat_user_login_ids = chatUserLoginIds;
      console.log(Notification);
      next();
    } catch (error) {
      console.log(`Error fetching Chatting: ${error.message}`);
      next(error);
    }
  },
  indexView: async (req, res) => {
    res.render("CoBuyRoom/chattingJuchoi");
  },
};
