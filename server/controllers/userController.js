/*const db = require("../models/index"),
  User = db.user;*/
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
    myPage: (req, res) => {
        res.render("user/mypage");
    },
    alarmPage: (req, res) => {
        res.render("user/alarmPage"); 
    },
  };
  