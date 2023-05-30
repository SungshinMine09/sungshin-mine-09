const router = require("express").Router(),
    userController = require("../controllers/userController"),
    JoinController = require("../controllers/JoinController"),
    verifyAuthController = require("../controllers/verifyAuthController");

router.get("/Login", userController.openLoginPage);
router.post("/Login", JoinController.LoginController);

router.get("/JoinStep1", userController.JoinStep1);
router.post("/JoinStep1", JoinController.generateEmailController);
router.post("/Join_emailAuth", JoinController.verifyCodeController);

router.get("/JoinStep2", userController.JoinStep2);
router.post("/Join_enterInfo", JoinController.registerController);

router.get("/JoinStep3", userController.JoinStep3);
//router.post("/Logout", JoinController.LogoutController);
router.get("/Logout", JoinController.LogoutController);

router.get("/myPage", verifyAuthController.checkAuth, userController.myPage);
router.get("/alarmPage", verifyAuthController.checkAuth, userController.alarmPage);

module.exports = router;