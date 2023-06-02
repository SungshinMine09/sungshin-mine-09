const router = require("express").Router(),
    userController = require("../controllers/userController"),
    JoinController = require("../controllers/JoinController"),
    verifyAuthController = require("../controllers/verifyAuthController"),
    findInfoController = require("../controllers/findInfoController");

//로그인 라우팅
router.get("/Login", userController.openLoginPage);
router.post("/Login", JoinController.LoginController);

//아이디 찾기 라우팅
router.get("/findID", userController.findID);
router.post("/findID", findInfoController.generateEmailController);
router.post("/findID_emailAuth", findInfoController.verifyCodeController_ID);

router.get("/getIDbyEmail", userController.getIDbyEmail);
router.post("/getIDbyEmail", findInfoController.getIDbyEmailController);

//비밀번호 찾기 라우팅
router.get("/findPW", userController.findPW);
router.post("/findPW", findInfoController.generateEmailController);
router.post("/findPW_emailAuth", findInfoController.verifyCodeController_PW);

router.get("/newPW", userController.newPW);
router.post("/newPW", findInfoController.newPasswordController);

//회원가입 라우팅
router.get("/JoinStep1", userController.JoinStep1);
router.post("/JoinStep1", JoinController.generateEmailController);
router.post("/Join_emailAuth", JoinController.verifyCodeController);

router.get("/JoinStep2", userController.JoinStep2);
router.post("/Join_enterInfo", JoinController.registerController);

router.get("/JoinStep3", userController.JoinStep3);

//로그아웃 라우팅
router.get("/Logout", JoinController.LogoutController);

//마이페이지, 알림페이지 라우팅
router.get("/myPage", verifyAuthController.checkAuth, userController.myPage);
router.get("/alarmPage", verifyAuthController.checkAuth, userController.alarmPage);
router.get("/chattingAlarm", verifyAuthController.checkAuth, userController.chattingAlarm);
router.get("/coBuyRoomAlarm", verifyAuthController.checkAuth, userController.coBuyRoomAlarm);

//아이디 및 비밀번호 변경 라우팅
router.get("/myPage/changeID", verifyAuthController.checkAuth, userController.changeID);
router.post("/myPage/changeID", verifyAuthController.checkAuth, findInfoController.changeIDController);

router.get("/myPage/changePW", verifyAuthController.checkAuth, userController.changePW);
router.post("/myPage/changePW", verifyAuthController.checkAuth, findInfoController.changePasswordController);

module.exports = router;