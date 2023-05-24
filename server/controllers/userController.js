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
        //demandUserData=await DemandUser.findAll();
        notificationData=await Notification.findAll({
          where: {
            receiver_id: 2  // 여기 '2' 자리에 user_id에 관한 게 들어가면 될 듯(아....마...도...?)
          }
        });
        // console.log(notificationData);
        res.render("user/alarmPage", {notifications: notificationData});
     } catch(error) {
       console.log(error);
     }  
   },

    coBuyRoomAlarm: async(req, res) => {
      try {
        notificationData2=await Notification.findAll({
          where: {
            receiver_id: 2,   // 여기 '2' 자리에 user_id에 관한 게 들어가면 될 듯
            type2: ['sell', 'deposit_form', 'update_post']  
          }
        });
        console.log(notificationData2);
        res.render("user/coBuyRoomAlarm", {notifications: notificationData2});
      } catch(error) {
        console.log(error);
      }
    },
    chattingAlarm: async(req, res) => {
      try {
        notificationData3 = await Notification.findAll({
          where: {
            receiver_id: 2,   // 여기 '2' 자리에 user_id에 관한 게 들어가면 될 듯
            type2: 'chat'
          }
        });
        console.log(data);
        res.render("user/chattingAlarm", {notifications: notificationData3});
      } catch(error) {
        console.log(error);
      }
    },
  };
  