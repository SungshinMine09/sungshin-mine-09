const router = require("express").Router(),
  CoBuyRoomController = require("../controllers/CoBuyRoomController");

router.get("/totalGonggu", CoBuyRoomController.totalGonggu);
router.get("/ingSuyo", CoBuyRoomController.ingSuyo);
router.get("/soonEnd", CoBuyRoomController.soonEnd);
router.get("/suyoStat", CoBuyRoomController.suyoStat);
router.get("/newPost", CoBuyRoomController.newPost);
router.get("/detail", CoBuyRoomController.detail);
router.get("/createNewPost", CoBuyRoomController.createNewPost);
router.get("/createCoBuyRoom", CoBuyRoomController.createCoBuyRoom);
router.get("/chatting", CoBuyRoomController.chatting);
router.get("/CoBuyForm/fillDepositForm", CoBuyRoomController.fillDepositForm);
router.get("/CoBuyForm/submitDepositForm", CoBuyRoomController.submitDepositForm);
router.get("/CoBuyForm/showAccount", CoBuyRoomController.showAccount);
router.get("/CoBuyForm/depositResult", CoBuyRoomController.depositResult);

module.exports = router;