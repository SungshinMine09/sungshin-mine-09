const router = require("express").Router(),
  CoBuyFormController = require("../controllers/CoBuyFormController"),
  verifyAuthController = require("../controllers/verifyAuthController");

/* 입금폼 생성 페이지 */
router.get("/:room_id/depositFormMaker", verifyAuthController.checkAuth, verifyAuthController.checkSeller, CoBuyFormController.depositFormMaker);
router.post("/:form_id/edit", verifyAuthController.checkAuth, verifyAuthController.checkSeller, CoBuyFormController.edit);
router.post("/:form_id/add", verifyAuthController.checkAuth, verifyAuthController.checkSeller, CoBuyFormController.add);
router.post("/:form_id/delete", verifyAuthController.checkAuth, verifyAuthController.checkSeller, CoBuyFormController.delete);
router.post("/:room_id/saveAccount", verifyAuthController.checkAuth, verifyAuthController.checkSeller, CoBuyFormController.saveAccount);

/* 입금폼 작성 페이지 */
router.get("/:form_id/writeForm", verifyAuthController.checkAuth, CoBuyFormController.writeForm);

router.get("/:form_id/showAccount", verifyAuthController.checkAuth, CoBuyFormController.showAccount);
router.post("/:form_id/submit", verifyAuthController.checkAuth, CoBuyFormController.submit);
router.get("/:form_id/depositFormResult", verifyAuthController.checkAuth, verifyAuthController.checkSeller, CoBuyFormController.depositFormResult);

module.exports = router;
