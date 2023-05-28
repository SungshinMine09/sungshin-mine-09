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
        myParticipations = await db.sequelize.query("SELECT  b.cobuying_room_id, a.title, a.state, a.description, a.host_id, b.user_id, c.descriription, date_format(c.end_at, '%y-%m-%d') AS 'end_at' FROM cobuying_room as a JOIN demand_user as b JOIN deposit_form as c ON (a.`id` = b.`cobuying_room_id`) and (b.`cobuying_room_id` = c.`cobuying_room_id`);");
        myParticipations=myParticipations[0];
        //console.log(myParticipations);
        numOfMyParticipations = myParticipations.length;

        myHosts = await db.sequelize.query("SELECT a.id, a.title, a.state, a.description, a.host_id, date_format(b.end_at, '%y-%m-%d') AS 'end_at' FROM cobuying_room AS a LEFT JOIN deposit_form AS b ON (a.`id` = b.`cobuying_room_id`) WHERE a.host_id = 2;");
        myHosts=myHosts[0];
        //console.log(myHost);
        numOfMyHosts = myHosts.length;
        res.render("user/mypage", {myParticipations: myParticipations, myHosts: myHosts, numOfMyParticipations: numOfMyParticipations, numOfMyHosts: numOfMyHosts});
      } catch (error) {
        console.log(error);
      }
      
    },
    alarmPage: (req, res) => {
      res.render("user/alarmPage");
    },
  };
  