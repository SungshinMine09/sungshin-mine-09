const db = require("../models/");
const router = require("express").Router(),
  CoBuyRoomController = require("../controllers/CoBuyRoomController"),
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
router.get("/totalGonggu/:id", CoBuyRoomController.detail); // 공구방 상세페이지
router.get("/:id", verifyAuthController.checkAuth, CoBuyRoomController.detail); // 공구방 상세페이지
router.get(
  "/:id/suyoStat",
  verifyAuthController.checkAuth,
  CoBuyRoomController.suyoStat
); // 수요조사 통계
router.get("/suyoStat", CoBuyRoomController.suyoStat);
router.get("/:room_id/newPost", CoBuyRoomController.newPost);
router.get("/detail", CoBuyRoomController.detail); // (테스트용) detail의 정확한 경로는 /totalGonggu/:id이므로 나중에 지우기
router.get("/createNewPost", CoBuyRoomController.createNewPost);
router.get("/createCoBuyRoom", CoBuyRoomController.createCoBuyRoomPage);
router.post(
  "/createCoBuyRoom",
  upload.single("roomImg"),
  CoBuyRoomController.createCoBuyRoom
);
router.get("/chatting", CoBuyRoomController.chatting);

module.exports = router;
