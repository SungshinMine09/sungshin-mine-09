const notification = require("../models/notification");
const jwt = require("jsonwebtoken");
const secretObj = require("../config/jwtConfig");

const db=require("../models/index"),
    Notification = db.notification, 
    User = db.user;


module.exports = {

    /* 로그인 페이지 */
    openLoginPage: (req, res) => {
      if (req.cookies['userToken'] == null) { //토큰이 없다면
        res.render("user/LoginPage", { isLoggedin: false }); //로그인 진행
      } else { //토큰이 있다면
        res.render("home/index", { isLoggedin: true}); //다시 로그인 페이지로 못 가도록 홈페이지 렌더링
      }
    },

    /* 회원가입 페이지 */
    JoinStep1: (req, res) => {
      if (req.cookies['userToken'] == null) { //토큰이 없다면
        res.render("user/JoinPage_1", { isLoggedin: false }); //회원가입 진행
      } else { //토큰이 있다면
        res.render("home/index", { isLoggedin: true}); //다시 회원가입 페이지로 못 가도록 홈페이지 렌더링
      }
    },
    JoinStep2: (req, res) => {
      if (req.cookies['userToken'] == null) { //토큰이 없다면
        res.render("user/JoinPage_2", { isLoggedin: false }); //회원가입 진행
      } else { //토큰이 있다면
        res.render("home/index", { isLoggedin: true}); //다시 회원가입 페이지로 못 가도록 홈페이지 렌더링
      }
    },
    JoinStep3: (req, res) => {
      if (req.cookies['userToken'] == null) { //토큰이 없다면
        res.render("user/JoinPage_3", { isLoggedin: false }); //회원가입 진행
      } else { //토큰이 있다면
        res.render("home/index", { isLoggedin: true}); //다시 회원가입 페이지로 못 가도록 홈페이지 렌더링
      }
    },
    
    /* 아이디/비밀번호 찾기 페이지 */
    findID: (req, res) => {
      if (req.cookies['userToken'] == null) { //토큰이 없다면
        res.render("user/findID", { isLoggedin: false }); 
      } else {
        res.render("home/index", { isLoggedin: true}); 
      }
    },

    findPW: (req, res) => {
      if (req.cookies['userToken'] == null) { //토큰이 없다면
        res.render("user/findPW", { isLoggedin: false }); 
      } else {
        res.render("home/index", { isLoggedin: true}); 
      }
    },

    getIDbyEmail: (req, res) => {
      if (req.cookies['userToken'] == null) { //토큰이 없다면
        res.render("user/getIDbyEmail", { isLoggedin: false }); 
      } else {
        res.render("home/index", { isLoggedin: true}); 
      }
    },

    newPW: (req, res) => {
      if (req.cookies['userToken'] == null) { //토큰이 없다면
        res.render("user/newPW", { isLoggedin: false }); 
      } else {
        res.render("home/index", { isLoggedin: true}); 
      }
    },
    /* 아이디/비밀번호 변경 페이지 (in 마이페이지) */
    changePW: (req, res) => {
      if (req.cookies['userToken'] != null) { //토큰이 있다면
        res.render("user/changePW", { isLoggedin: true });
      }
    },

    changeID: (req, res) => {
      if (req.cookies['userToken'] != null) { //토큰이 있다면
        res.render("user/changeID", { isLoggedin: true });
      }
    },

    /* 마이페이지 */
    myPage: async(req, res) => {
      try {
        const cobuyingRoomId = req.params.id;
        const userToken = req.cookies['userToken'];
        let secretObj = require("../config/jwtConfig");
        let decodedToken = jwt.verify(userToken,secretObj.secret);
        userInfos = await User.findAll();
        myParticipations = await db.sequelize.query("SELECT a.*, date_format(e.end_at, '%y-%m-%d') AS 'end_at', d.user_id, c.url, replace(c.url, 'public\', '') AS real_url  FROM cobuying_room as a JOIN sell as b ON a.id=b.cobuying_room_id JOIN image as c ON b.product_id=c.product_id JOIN demand_user as d ON a.id=d.cobuying_room_id LEFT JOIN deposit_form as e ON d.cobuying_room_id=e.id ORDER BY a.id  DESC;");
        //myParticipations = await db.sequelize.query("SELECT a.*, date_format(e.end_at, '%y-%m-%d') AS 'end_at',  c.url, replace(c.url, 'public\', '') AS real_url  FROM cobuying_room as a LEFT JOIN sell as b ON a.id=b.cobuying_room_id LEFT JOIN image as c ON b.product_id=c.product_id LEFT JOIN demand_user as d ON a.id=d.cobuying_room_id LEFT JOIN deposit_form as e ON a.id=e.id;");
        //얘numOfMyParticipations = await db.sequelize.query("SELECT  b.cobuying_room_id, a.title, a.state, a.description, a.host_id, b.user_id, c.description, date_format(c.end_at, '%y-%m-%d') AS 'end_at' FROM cobuying_room as a JOIN demand_user as b ON a.id=b.cobuying_room_id LEFT JOIN deposit_form as c ON b.cobuying_room_id = c.id;");
        //numOfMyParticipations = await db.sequelize.query("SELECT  b.cobuying_room_id, a.title, a.state, a.description, a.host_id, b.user_id, c.description, date_format(c.end_at, '%y-%m-%d') AS 'end_at' FROM cobuying_room as a JOIN demand_user as b ON a.id=b.cobuying_room_id JOIN deposit_form as c ON b.cobuying_room_id = c.id;");
        //myParticipations = await db.sequelize.query("SELECT  e.url, replace(e.url, 'public\', '') AS real_url a.id, a.title, a.state, a.description, a.host_id, b.user_id, date_format(c.end_at, '%y-%m-%d') AS 'end_at' FROM cobuying_room as a JOIN demand_user as b ON a.id=b.cobuying_room_id JOIN deposit_form as c ON a.id = c.id JOIN sell as d ON b.cobuying_room_id=d.cobuying_room_id JOIN image as e ON d.product_id=e.product_id;");
        /*productImg = await db.sequelize.query( 'SELECT A.*, B.*, replace(B.url, "public\", "") AS real_url FROM (SELECT A.*, B.`name` FROM (SELECT A.`product_id`, A.`cobuying_room_id`, B.`title`, A.`current_demand`, A.`min_demand` FROM sell AS A LEFT JOIN cobuying_room AS B ON A.`cobuying_room_id`=B.`id`) AS A LEFT JOIN product AS B ON A.`product_id`=B.`id`) AS A LEFT JOIN image AS B ON A.product_id=B.product_id;'
        ); */
        /*myParticipationsImg = await db.sequelize.query('SELECT * FROM (SELECT a.*, b.cobuying_room_id FROM (SELECT a.id as productId, a.name, a.createdAt, a.updatedAt, b.url, replace(b.url, “public\”, “”) AS url, b.id FROM product AS a, image AS b ON a.id = b.product_id) AS a, sell AS b ON a.productId=b.product_id) AS a, cobuying_room AS b ON a.cobuying_room_id=b.id;'); */
        /*productImg = productImg[0].filter((it)=>it.cobuying_room_id == cobuyingRoomId);*/
        myParticipations=myParticipations[0];
        //console.log(numOfMyParticipations);
        numOfMyParticipations = myParticipations.length;
        //얘numOfMyParticipations = numOfMyParticipations[0].length;
        //console.log(numOfMyParticipations);
        myHosts = await db.sequelize.query("SELECT a.*, date_format(d.end_at, '%y-%m-%d') AS 'end_at', c.url, replace(c.url, 'public\', '') AS real_url FROM cobuying_room AS a LEFT JOIN sell AS b ON a.id=b.cobuying_room_id LEFT JOIN image as c ON b.product_id=c.product_id LEFT JOIN deposit_form as d ON a.id=d.id ORDER BY a.id  DESC;");
        myHosts=myHosts[0];
        numOfMyHosts = myHosts.length;
        if(decodedToken) {
          res.render("user/mypage", {userInfos: userInfos, myParticipations: myParticipations, myHosts: myHosts, numOfMyParticipations: numOfMyParticipations, numOfMyHosts: numOfMyHosts, userID: decodedToken.db_id});
        }
      } catch (error) {
        console.log(error);
      }
    },

    /* 알림 페이지 */
    alarmPage: async(req, res) => {
      try {
        notificationsJoinCobuyingRooms1 = await db.sequelize.query("SELECT a.*, b.*, d.url, replace(d.url, 'public\', '') AS real_url  FROM notifications as a LEFT JOIN cobuying_room as b ON a.cobuying_room_id=b.id LEFT JOIN sell as c ON b.id=c.cobuying_room_id LEFT JOIN image as d ON c.product_id=d.product_id ORDER BY a.id DESC;")
        //notificationsJoinCobuyingRooms1 = await db.sequelize.query('SELECT a.id as notificationId, a.receiver_id, a.cobuying_room_id, a.content, a.read_or_not, a.type2, a.url, a.createdAt, a.updatedAt, b.title, b.state, b.host_id FROM notifications as a JOIN cobuying_room as b ON a.`cobuying_room_id`=b.`id` WHERE receiver_id=2 or host_id=2 ORDER BY a.id  DESC;'	       
        const userToken = req.cookies['userToken'];
        let secretObj = require("../config/jwtConfig");
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

   /* 공구방 새소식 알림만 보기 */
    coBuyRoomAlarm: async(req, res) => {
      try {
        notificationsJoinCobuyingRooms2 = await db.sequelize.query(
          "SELECT a.*, b.*, d.url, replace(d.url, 'public\', '') AS real_url  FROM notifications as a LEFT JOIN cobuying_room as b ON a.cobuying_room_id=b.id LEFT JOIN sell as c ON b.id=c.cobuying_room_id LEFT JOIN image as d ON c.product_id=d.product_id WHERE type2 != 'chat' ORDER BY a.id DESC;"
        );
        const userToken = req.cookies['userToken'];
        let secretObj = require("../config/jwtConfig");
        let decodedToken = jwt.verify(userToken,secretObj.secret);
        notificationsJoinCobuyingRoom2 = notificationsJoinCobuyingRooms2[0];
        if(decodedToken) {
          res.render("user/coBuyRoomAlarm", {coBuyRoomNotifications: notificationsJoinCobuyingRoom2, userID: decodedToken.db_id});
        }
      } catch(error) {
        console.log(error);
      }
    },
    /* 채팅 알림만 보기 */
    chattingAlarm: async(req, res) => {
      try {
        notificationsJoinCobuyingRooms3 = await db.sequelize.query(
          "SELECT a.*, b.*, d.url, replace(d.url, 'public\', '') AS real_url  FROM notifications as a LEFT JOIN cobuying_room as b ON a.cobuying_room_id=b.id LEFT JOIN sell as c ON b.id=c.cobuying_room_id LEFT JOIN image as d ON c.product_id=d.product_id WHERE type2 = 'chat' ORDER BY a.id DESC;"
        );
        const userToken = req.cookies['userToken'];
        let secretObj = require("../config/jwtConfig");
        let decodedToken = jwt.verify(userToken,secretObj.secret);
        notificationsJoinCobuyingRoom3 = notificationsJoinCobuyingRooms3[0];
        if(decodedToken) {
          res.render("user/chattingAlarm", {chattingNotifications: notificationsJoinCobuyingRoom3, userID: decodedToken.db_id});
        }
      } catch(error) {
        console.log(error);
      }
    },
  };
  