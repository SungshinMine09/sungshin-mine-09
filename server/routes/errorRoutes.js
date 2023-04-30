const router = require("express").Router(),
  errorController = require("../controllers/errorController");

router.use(errorController.logErrors);

module.exports = router;
