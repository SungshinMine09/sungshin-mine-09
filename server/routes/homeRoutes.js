const router = require("express").Router(),
  homeController = require("../controllers/homeController");

router.get("/", homeController.index);
router.get("/totalGonggu", homeController.totalGonggu);
router.get("/suyoStat", homeController.suyoStat);

module.exports = router;
