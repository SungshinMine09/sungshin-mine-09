const homeController = require("../controllers/homeController");

const db = require("../models/");
const router = require("express").Router(),
  CoBuyRoomController = require("../controllers/CoBuyRoomController"),
  CoBuyRoomDetailController = require("../controllers/coBuyRoomDetailController"), // 상의 후 다현님 코드와 합치거나 할 것
  NewpostController = require("../controllers/newpostController"),
  CreatePostController = require("../controllers/createPostController"),
  ChatController = require("../controllers/chattingController"),
  verifyAuthController = require("../controllers/verifyAuthController");

const multer = require("multer");
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/");
  },
  filename: async (req, file, cb) => {
    const room_id = (await db.cobuying_room.count()) + 1; //count() will be added
    const uniqueSuffix = room_id;
    const fileExtension = file.originalname.split(".").pop();
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + fileExtension);
  },
});

const upload = multer({ storage: imageStorage });

router.get("/totalGonggu", CoBuyRoomController.totalGonggu);
router.get("/ingSuyo", CoBuyRoomController.ingSuyo);
router.get("/soonEnd", CoBuyRoomController.soonEnd);
router.get("/totalGonggu/:id",  verifyAuthController.checkAuth, CoBuyRoomController.detail); // 공구방 상세페이지
router.get("/:id", verifyAuthController.checkAuth, CoBuyRoomController.detail); // 공구방 상세페이지
router.get("/:id/suyoStat", verifyAuthController.checkAuth, CoBuyRoomController.suyoStat); // 수요조사 통계
router.get("/suyoStat",  verifyAuthController.checkAuth, CoBuyRoomController.suyoStat);
router.get("/:room_id/newPost",  verifyAuthController.checkAuth, CoBuyRoomController.newPost);
router.get("/detail", verifyAuthController.checkAuth, CoBuyRoomController.detail); // (테스트용) detail의 정확한 경로는 /totalGonggu/:id이므로 나중에 지우기
router.get("/createNewPost",  verifyAuthController.checkAuth, CoBuyRoomController.createNewPost);
router.get("/createCoBuyRoom",  verifyAuthController.checkAuth, CoBuyRoomController.createCoBuyRoomPage);
router.post("/createCoBuyRoom", upload.single("roomImg"),  verifyAuthController.checkAuth, CoBuyRoomController.createCoBuyRoom);
router.get("/chatting",  verifyAuthController.checkAuth, CoBuyRoomController.chatting);

// 기연 할일: 위 코드에서 detail, totalgonguid 다시 확인할 것
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

// chatting
router.get("/:id/chat/:chatId", ChatController.index, ChatController.indexView);

module.exports = router;
