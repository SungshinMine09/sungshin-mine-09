const homeController = require("../controllers/homeController");

const router = require("express").Router(),
  CoBuyRoomController = require("../controllers/CoBuyRoomController"),
  CoBuyRoomDetailController = require("../controllers/coBuyRoomDetailController"), // 상의 후 다현님 코드와 합치거나 할 것
  NewpostController = require("../controllers/newpostController"),
  CreatePostController = require("../controllers/createPostController");

router.get("/totalGonggu", CoBuyRoomController.totalGonggu);
router.get("/ingSuyo", CoBuyRoomController.ingSuyo);
router.get("/soonEnd", CoBuyRoomController.soonEnd);
// router.get("/totalGonggu/:id", CoBuyRoomController.detail); // 공구방 상세페이지
router.get("/:id/suyoStat", CoBuyRoomController.suyoStat);
router.get("/newPost", CoBuyRoomController.newPost);
// router.get("/detail", CoBuyRoomController.detail); // (테스트용) detail의 정확한 경로는 /totalGonggu/:id이므로 나중에 지우기
router.get("/createNewPost", CoBuyRoomController.createNewPost);
router.get("/createCoBuyRoom", CoBuyRoomController.createCoBuyRoom);
router.get("/chatting", CoBuyRoomController.chatting);
router.get("/CoBuyForm/fillDepositForm", CoBuyRoomController.fillDepositForm);
router.get("/CoBuyForm/submitDepositForm", CoBuyRoomController.submitDepositForm);
router.get("/CoBuyForm/showAccount", CoBuyRoomController.showAccount);
router.get("/CoBuyForm/depositResult", CoBuyRoomController.depositResult);

// 상세페이지
router.get("/:id/detail", CoBuyRoomDetailController.index, CoBuyRoomDetailController.indexView); // 상의후 다현님 코드와 합치거나 할 것
router.get("/:id/chatting", CoBuyRoomDetailController.chatting);

router.get("/:id/updateCurrentDemand", CoBuyRoomDetailController.updateCurrentDemand, CoBuyRoomDetailController.redirectView);
router.get("/:id/deleteCoBuyRoom", CoBuyRoomDetailController.deleteCoBuyRoom);

router.get("/:id/CoBuyForm/depositResult", CoBuyRoomDetailController.depositResult);
router.get("/:id/CoBuyForm/fillDepositForm", CoBuyRoomDetailController.fillDepositForm);
router.get("/:id/CoBuyForm/submitDepositForm", CoBuyRoomDetailController.submitDepositForm);

// newpost
router.get("/:id/newpost", NewpostController.index, NewpostController.indexView);

// createPost
router.get("/:id/createPost", CreatePostController.index, CreatePostController.indexView);
router.post("/:id/createPost/create", CreatePostController.createPost, CreatePostController.redirectView);

module.exports = router;
