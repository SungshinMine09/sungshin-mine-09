const router = require("express").Router(),
  CoBuyFormController = require("../controllers/CoBuyFormController");

router.get("/:room_id/depositFormMaker", CoBuyFormController.depositFormMaker);
router.post("/:room_id/depositFormMaker", CoBuyFormController.depositFormMake);
router.post("/:form_id/edit", CoBuyFormController.edit);
router.post("/:form_id/add", CoBuyFormController.add);
router.get("/:form_id/delete", CoBuyFormController.delete);
router.post("/:room_id/saveAccount", CoBuyFormController.saveAccount);

// router.post("/depositFormMaker", CoBuyFormController.depositFormMake);

router.get("/depositFormSubmit", CoBuyFormController.depositFormSubmit);
router.get("/showAccount", CoBuyFormController.showAccount);
router.get("/depositFormResult", CoBuyFormController.depositFormResult);

module.exports = router;
