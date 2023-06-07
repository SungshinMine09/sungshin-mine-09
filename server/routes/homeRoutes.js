const router = require("express").Router(),
  homeController = require("../controllers/homeController");

  router.get("/", homeController.index);
  router.get("/index", homeController.index);  

module.exports = router;
