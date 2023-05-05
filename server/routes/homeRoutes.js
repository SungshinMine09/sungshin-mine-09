const router = require("express").Router(),
  homeController = require("../controllers/homeController");

router.get("/", homeController.index);
router.get("/totalGonggu", homeController.totalGonggu);
router.get("/suyoStat", homeController.suyoStat);
router.get("/LoginPage", homeController.LoginPage);
router.get("/JoinPage_1", homeController.JoinPage_1);
router.get("/JoinPage_2", homeController.JoinPage_2);
router.get("/JoinPage_3", homeController.JoinPage_3);

module.exports = router;
