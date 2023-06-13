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
  // 단순 chatroom url을 받은 경우
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
      // 해당 공구방의 첫번째 채팅방 불러오기
      if (is_room_creater) {
        chatroom_using = await ChatRoom.findOne({
          where: {
            cobuying_room_id: coBuyingRoomID,
          },
          order: [["id", "desc"]],
        });
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
      const query = "SELECT user.login_id, user.id FROM chatroom JOIN user ON chatroom.guest_id=user.id WHERE chatroom.cobuying_room_id=" + coBuyingRoomID;
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
  // 특정한 user id 값을 받은 경우, 해당하는 채팅방으로 (주최자가 동일 공동구매방 내에서 채팅방을 바꿀 때 사용하는 미들웨어)
  chatRoom: async (req, res, next) => {
    try {
      const coBuyingRoomID = req.params.id;
      const guest_login_id = req.params.login_id;
      const cobuyroom = await CoBuyingRoom.findByPk(coBuyingRoomID);

      // 주최자/일반유저 여부 확인
      user = await verifyAuthController.checkID(req);
      user_id = user.dataValues.id;
      user_login_id = user.dataValues.login_id;
      is_room_creater = true; // 주최자 여부

      // 채팅방 가져오기
      guest = await User.findOne({
        where: {
          login_id: guest_login_id,
        },
      });
      let chatroom_using = await ChatRoom.findOne({
        where: {
          cobuying_room_id: coBuyingRoomID,
          guest_id: guest.id,
        },
      });

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
      const query = "SELECT user.login_id, user.id FROM chatroom JOIN user ON chatroom.guest_id=user.id WHERE chatroom.cobuying_room_id=" + coBuyingRoomID;
      const chatUserLoginIds = await db.sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
      console.log(chatUserLoginIds);

      res.locals.cobuyroom = cobuyroom;
      res.locals.chatroom_using = chatroom_using;
      res.locals.is_room_creater = is_room_creater;
      res.locals.user_login_id = user_login_id;
      res.locals.user_id = user_id;
      res.locals.messages = messages;
      res.locals.dates = dates;
      res.locals.chat_user_login_ids = chatUserLoginIds;
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
