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
        data=await Notification.findAll();
        console.log(data);
        res.render("user/alarmPage", {notifications: data});
      } catch {
        res.status(500).send({
          message: err.message
        });
      }  
    },
    coBuyRoomAlarm: async(req, res) => {
      try {
        data = await Notification.findAll({
          where: {
            type2: ['sell', 'deposit_form', 'update_post']
          }
        });
        console.log(data);
        res.render("user/coBuyRoomAlarm", {notifications: data});
      } catch {
        res.status(500).send({
          message: err.message
        });
      }
    },
    chattingAlarm: async(req, res) => {
      try {
        data = await Notification.findAll({
          where: {
            type2: 'chat'
          }
        });
        console.log(data);
        res.render("user/chattingAlarm", {notifications: data});
      } catch {
        res.status(500).send({
          message: err.message
        });
      }
    },
  };
  