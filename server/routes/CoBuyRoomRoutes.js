const router = require("express").Router(),
  CoBuyRoomController = require("../controllers/CoBuyRoomController"),
  verifyAuthController = require("../controllers/verifyAuthController");

router.get("/totalGonggu", CoBuyRoomController.totalGonggu);
router.get("/ingSuyo", CoBuyRoomController.ingSuyo);
router.get("/soonEnd", CoBuyRoomController.soonEnd);
router.get("/:id", verifyAuthController.checkAuth, CoBuyRoomController.detail); // 공구방 상세페이지
router.get("/:id/suyoStat", verifyAuthController.checkAuth, CoBuyRoomController.suyoStat); // 수요조사 통계
router.get("/newPost", verifyAuthController.checkAuth, CoBuyRoomController.newPost);
router.get("/detail", verifyAuthController.checkAuth, CoBuyRoomController.detail); // (테스트용) detail의 정확한 경로는 /totalGonggu/:id이므로 나중에 지우기
router.get("/createNewPost", verifyAuthController.checkAuth, CoBuyRoomController.createNewPost);
router.get("/createCoBuyRoom", verifyAuthController.checkAuth, CoBuyRoomController.createCoBuyRoom);
router.get("/chatting", verifyAuthController.checkAuth, CoBuyRoomController.chatting);
router.get("/CoBuyForm/fillDepositForm", verifyAuthController.checkAuth, CoBuyRoomController.fillDepositForm);
router.get("/CoBuyForm/submitDepositForm", verifyAuthController.checkAuth, CoBuyRoomController.submitDepositForm);
router.get("/CoBuyForm/showAccount", verifyAuthController.checkAuth, CoBuyRoomController.showAccount);
router.get("/CoBuyForm/depositResult", verifyAuthController.checkAuth, CoBuyRoomController.depositResult);

module.exports = router;