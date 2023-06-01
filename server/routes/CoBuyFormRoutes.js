const router = require("express").Router(),
  CoBuyFormController = require("../controllers/CoBuyFormController");

/* 입금폼 생성 페이지 */
router.get("/:room_id/depositFormMaker", CoBuyFormController.depositFormMaker);
router.post("/:form_id/edit", CoBuyFormController.edit);
router.post("/:form_id/add", CoBuyFormController.add);
router.post("/:form_id/delete", CoBuyFormController.delete);
router.post("/:room_id/saveAccount", CoBuyFormController.saveAccount);

/* 입금폼 작성 페이지 */
router.get("/:form_id/writeForm", CoBuyFormController.writeForm);

router.get("/:form_id/showAccount", CoBuyFormController.showAccount);
router.post("/:form_id/submit", CoBuyFormController.submit);
router.get(
  "/:form_id/depositFormResult",
  CoBuyFormController.depositFormResult
);

module.exports = router;
