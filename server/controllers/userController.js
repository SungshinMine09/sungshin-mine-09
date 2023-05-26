const db = require("../models/index");

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
    myPage: async(req, res) => {
      try {
        myParticipations = await db.sequelize.query("SELECT * FROM cobuying_room as a JOIN demand_user as b ON a.`id` = b.`cobuying_room_id`;");
        myParticipations=myParticipations[0];
        //console.log(myParticipations);
      } catch (error) {
        console.log(error);
      }
      res.render("user/mypage");
    },
    alarmPage: (req, res) => {
      res.render("user/alarmPage");
    },
  };
  