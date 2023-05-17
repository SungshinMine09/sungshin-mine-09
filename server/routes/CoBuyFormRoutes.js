const router = require("express").Router(),
  CoBuyFormController = require("../controllers/CoBuyFormController");

router.get("/depositFormMaker", CoBuyFormController.depositFormMaker);
router.get("/depositFormSubmit", CoBuyFormController.depositFormSubmit);
router.get("/showAccount", CoBuyFormController.showAccount);
router.get("/depositFormResult", CoBuyFormController.depositFormResult);

module.exports = router;
