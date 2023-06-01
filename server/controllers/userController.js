const notification = require("../models/notification");
const jwt = require("jsonwebtoken");

const db=require("../models/index"),
    Notification = db.notification, 
    User = db.user;
//const bcrypt = require("bcrypt");


module.exports = {
    openLoginPage: (req, res) => {
      if (req.cookies['userToken'] == null) { //토큰이 없다면
        res.render("user/LoginPage", { isLoggedin: false }); 
      } else {
        res.render("home/index", { isLoggedin: true}); 
      }
    },
    JoinStep1: (req, res) => {
      if (req.cookies['userToken'] == null) { //토큰이 없다면
        res.render("user/JoinPage_1", { isLoggedin: false }); 
      } else {
        res.render("home/index", { isLoggedin: true}); 
      }
    },
    JoinStep2: (req, res) => {
      if (req.cookies['userToken'] == null) { //토큰이 없다면
        res.render("user/JoinPage_2", { isLoggedin: false }); 
      } else {
        res.render("home/index", { isLoggedin: true}); 
      }
    },
    JoinStep3: (req, res) => {
      if (req.cookies['userToken'] == null) { //토큰이 없다면
        res.render("user/JoinPage_3", { isLoggedin: false }); 
      } else {
        res.render("home/index", { isLoggedin: true}); 
      }
    },

    myPage: async(req, res) => {
      try {
        userInfos = await User.findAll();
        myParticipations = await db.sequelize.query("SELECT  b.cobuying_room_id, a.title, a.state, a.description, a.host_id, b.user_id, c.descriription, date_format(c.end_at, '%y-%m-%d') AS 'end_at' FROM cobuying_room as a JOIN demand_user as b JOIN deposit_form as c ON (a.`id` = b.`cobuying_room_id`) and (b.`cobuying_room_id` = c.`cobuying_room_id`);");
        myParticipations=myParticipations[0];
        //console.log(myParticipations);
        numOfMyParticipations = myParticipations.length;

        myHosts = await db.sequelize.query("SELECT a.id as cobuying_room_id, a.title, a.state, a.description, a.host_id, date_format(b.end_at, '%y-%m-%d') AS 'end_at' FROM cobuying_room AS a LEFT JOIN deposit_form AS b ON (a.`id` = b.`cobuying_room_id`) WHERE a.host_id = 2;");
        myHosts=myHosts[0];
        //console.log(myHost);
        numOfMyHosts = myHosts.length;
        res.render("user/mypage", {userInfos: userInfos, myParticipations: myParticipations, myHosts: myHosts, numOfMyParticipations: numOfMyParticipations, numOfMyHosts: numOfMyHosts});
      } catch (error) {
        console.log(error);
      }
    },

    alarmPage: async(req, res) => {
      try {
        notificationsJoinCobuyingRooms1 = await db.sequelize.query(
          'SELECT a.id as notificationId, a.receiver_id, a.cobuying_room_id, a.content, a.read_or_not, a.type2, a.url, a.createdAt, a.updatedAt, b.title, b.state, b.host_id FROM notifications as a JOIN cobuying_room as b ON a.`cobuying_room_id`=b.`id` WHERE receiver_id=2 or host_id=2 ORDER BY a.id  DESC;'
        );
        const userToken = req.cookies['userToken'];
        let decodedToken = jwt.verify(userToken,secretObj.secret);
        notificationsJoinCobuyingRoom1 = notificationsJoinCobuyingRooms1[0];
        // console.log(notificationsJoinCobuyingRoom1);
        if(decodedToken) {
          res.render("user/alarmPage", {notifications: notificationsJoinCobuyingRoom1, userID: decodedToken.db_id});
        }
     } catch(error) {
       console.log(error);
     }  
   },
    coBuyRoomAlarm: async(req, res) => {
      try {
        notificationsJoinCobuyingRooms2 = await db.sequelize.query(
          "SELECT * FROM notifications as a JOIN cobuying_room as b ON a.`cobuying_room_id`=b.`id` WHERE (receiver_id=2 or host_id=2) and type2 != 'chat' ORDER BY a.id DESC;"
        );
        const userToken = req.cookies['userToken'];
        let decodedToken = jwt.verify(userToken,secretObj.secret);
        notificationsJoinCobuyingRoom2 = notificationsJoinCobuyingRooms2[0];
        if(decodedToken) {
          res.render("user/alarmPage", {notifications: notificationsJoinCobuyingRoom1, userID: decodedToken.db_id});
        }
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
        const userToken = req.cookies['userToken'];
        let decodedToken = jwt.verify(userToken,secretObj.secret);
        notificationsJoinCobuyingRoom3 = notificationsJoinCobuyingRooms3[0];
        if(decodedToken) {
          res.render("user/alarmPage", {notifications: notificationsJoinCobuyingRoom1, userID: decodedToken.db_id});
        }
        res.render("user/chattingAlarm", {chattingNotifications: notificationsJoinCobuyingRoom3});
      } catch(error) {
        console.log(error);
      }
    },
  };
  