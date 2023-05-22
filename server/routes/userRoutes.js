const router = require("express").Router(),
    userController = require("../controllers/userController");

router.get("/Login", userController.Login);
router.get("/JoinStep1", userController.JoinStep1);
router.get("/JoinStep2", userController.JoinStep2);
router.get("/JoinStep3", userController.JoinStep3);
router.get("/myPage", userController.myPage);
router.get("/alarmPage", userController.alarmPage);
router.get("/chattingAlarm", userController.chattingAlarm);
router.get("/coBuyRoomAlarm",userController.coBuyRoomAlarm);

module.exports = router;