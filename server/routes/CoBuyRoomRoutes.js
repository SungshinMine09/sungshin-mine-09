
const db = require("../models/");
const router = require("express").Router(),
  CoBuyRoomController = require("../controllers/CoBuyRoomController");

const multer = require('multer');
const imageStorage = multer.diskStorage( {
  destination: (req, file, cb) => {
    cb(null, "public/images/");
  },
  filename: async (req, file, cb) => {
    const room_id = await db.cobuying_room.count() + 1; //count() will be added
    const uniqueSuffix = room_id;
    const fileExtension = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension);
  }
})

const upload = multer({storage: imageStorage});

router.get("/totalGonggu", CoBuyRoomController.totalGonggu);
router.get("/ingSuyo", CoBuyRoomController.ingSuyo);
router.get("/soonEnd", CoBuyRoomController.soonEnd);
router.get("/suyoStat", CoBuyRoomController.suyoStat);
router.get("/newPost", CoBuyRoomController.newPost);
router.get("/detail", CoBuyRoomController.detail);
router.get("/createNewPost", CoBuyRoomController.createNewPost);
router.get("/createCoBuyRoom", CoBuyRoomController.createCoBuyRoomPage);
router.post("/createCoBuyRoom", upload.single('roomImg'), CoBuyRoomController.createCoBuyRoom);
router.get("/chatting", CoBuyRoomController.chatting);
router.get("/CoBuyForm/fillDepositForm", CoBuyRoomController.fillDepositForm);
router.get(
  "/CoBuyForm/submitDepositForm",
  CoBuyRoomController.submitDepositForm
);
router.get("/CoBuyForm/showAccount", CoBuyRoomController.showAccount);
router.get("/CoBuyForm/depositResult", CoBuyRoomController.depositResult);

module.exports = router;
