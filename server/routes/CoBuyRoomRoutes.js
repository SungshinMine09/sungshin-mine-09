const homeController = require("../controllers/homeController");

const db = require("../models/");
const router = require("express").Router(),
  CoBuyRoomController = require("../controllers/CoBuyRoomController"),
  CoBuyRoomDetailController = require("../controllers/coBuyRoomDetailController"),
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
router.get("/totalGonggu/:id", verifyAuthController.checkAuth, CoBuyRoomDetailController.index, CoBuyRoomDetailController.indexView); // 공구방 상세페이지
router.get("/:id/suyoStat", verifyAuthController.checkAuth, CoBuyRoomController.suyoStat); // 수요조사 통계
router.get("/suyoStat", verifyAuthController.checkAuth, CoBuyRoomController.suyoStat);
router.get("/createNewPost", verifyAuthController.checkAuth, verifyAuthController.checkSeller, CoBuyRoomController.createNewPost);
router.get("/createCoBuyRoom", verifyAuthController.checkAuth, CoBuyRoomController.createCoBuyRoomPage);
router.post("/createCoBuyRoom", upload.single("roomImg"), verifyAuthController.checkAuth, CoBuyRoomController.createCoBuyRoom);
router.get("/chatting", verifyAuthController.checkAuth, CoBuyRoomController.chatting);
router.get("/:id", verifyAuthController.checkAuth, CoBuyRoomDetailController.index, CoBuyRoomDetailController.indexView); // 공구방 상세페이지

// 상세페이지
router.get("/:id/detail", verifyAuthController.checkAuth, CoBuyRoomDetailController.index, CoBuyRoomDetailController.indexView); // 상의후 다현님 코드와 합치거나 할 것
router.get("/:id/chatting", verifyAuthController.checkAuth, CoBuyRoomDetailController.chatting);
router.get("/:id/chat/:chatId", verifyAuthController.checkAuth, ChatController.index, ChatController.indexView);

router.get("/:id/updateCurrentDemand", verifyAuthController.checkAuth, verifyAuthController.checkSeller, CoBuyRoomDetailController.updateCurrentDemand, CoBuyRoomDetailController.redirectView);
router.get("/:id/deleteCoBuyRoom", verifyAuthController.checkAuth, verifyAuthController.checkSeller, CoBuyRoomDetailController.deleteCoBuyRoom);

// newpost
router.get("/:id/newpost", verifyAuthController.checkAuth, NewpostController.index, NewpostController.indexView);

// createPost
router.get("/:id/createPost", verifyAuthController.checkAuth, verifyAuthController.checkSeller, CreatePostController.index, CreatePostController.indexView);
router.post("/:id/createPost/create",verifyAuthController.checkAuth, verifyAuthController.checkSeller, CreatePostController.createPost, CreatePostController.redirectView);

// chatting

module.exports = router;
