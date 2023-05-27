const notification = require("../models/notification");

const db=require("../models/index"),
    Notification = db.notification;

module.exports = {
    Login: (req, res) => {
      res.render("user/LoginPage");
    },
    JoinStep1: (req, res) => {
      res.render("user/JoinPage_1");
    },
    JoinStep2: (req, res) => {
      res.render("user/JoinPage_2");
    },
    JoinStep3: (req, res) => {
      res.render("user/JoinPage_3");
    },
    myPage: (req, res) => {
      res.render("user/mypage");
    },
    alarmPage: async(req, res) => {
      try {
        notificationsJoinCobuyingRooms1 = await db.sequelize.query(
          'SELECT * FROM notifications as a JOIN cobuying_room as b ON a.`cobuying_room_id`=b.`id` WHERE receiver_id=2 or host_id=2 ORDER BY a.id  DESC;'
        );
        notificationsJoinCobuyingRoom1 = notificationsJoinCobuyingRooms1[0];
        console.log(notificationsJoinCobuyingRoom1);
        res.render("user/alarmPage", {notifications: notificationsJoinCobuyingRoom1});
     } catch(error) {
       console.log(error);
     }  
   },

    coBuyRoomAlarm: async(req, res) => {
      try {
        notificationsJoinCobuyingRooms2 = await db.sequelize.query(
          "SELECT * FROM notifications as a JOIN cobuying_room as b ON a.`cobuying_room_id`=b.`id` WHERE (receiver_id=2 or host_id=2) and type2 != 'chat' ORDER BY a.id DESC;"
        );
        notificationsJoinCobuyingRoom2 = notificationsJoinCobuyingRooms2[0];
        res.render("user/coBuyRoomAlarm", {coBuyRoomNotifications: notificationsJoinCobuyingRoom2});
      } catch(error) {
        console.log(error);
      }
    },
    
    chattingAlarm: async(req, res) => {
      try {
        notificationsJoinCobuyingRooms3 = await db.sequelize.query(
          "SELECT * FROM notifications as a JOIN cobuying_room as b ON a.`cobuying_room_id`=b.`id` WHERE (receiver_id=2 or host_id=2) and type2 = 'chat' ORDER BY a.id DESC;"
        );
        notificationsJoinCobuyingRoom3 = notificationsJoinCobuyingRooms3[0];
        res.render("user/chattingAlarm", {chattingNotifications: notificationsJoinCobuyingRoom3});
      } catch(error) {
        console.log(error);
      }
    },
  };
  