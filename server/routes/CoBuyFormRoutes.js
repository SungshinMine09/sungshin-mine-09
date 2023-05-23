const router = require("express").Router(),
  CoBuyFormController = require("../controllers/CoBuyFormController");

router.get("/:room_id/depositFormMaker", CoBuyFormController.depositFormMaker);
router.post("/:room_id/depositFormMaker", CoBuyFormController.depositFormMake);
// router.post("/depositFormMaker", CoBuyFormController.addQuestion);

// router.post("/depositFormMaker", CoBuyFormController.depositFormMake);

router.get("/depositFormSubmit", CoBuyFormController.depositFormSubmit);
router.get("/showAccount", CoBuyFormController.showAccount);
router.get("/depositFormResult", CoBuyFormController.depositFormResult);

module.exports = router;
