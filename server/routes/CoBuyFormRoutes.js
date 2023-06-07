const router = require("express").Router(),
  CoBuyFormController = require("../controllers/CoBuyFormController"),
  verifyAuthController = require("../controllers/verifyAuthController");

/* 입금폼 생성 페이지 */
router.get("/:room_id/depositFormMaker", verifyAuthController.checkAuth, verifyAuthController.checkSellerbyRoomID, CoBuyFormController.depositFormMaker);
router.post("/:form_id/edit", verifyAuthController.checkAuth, verifyAuthController.checkSellerbyFormID, CoBuyFormController.edit);
router.post("/:form_id/add", verifyAuthController.checkAuth, verifyAuthController.checkSellerbyFormID, CoBuyFormController.add);
router.post("/:form_id/delete", verifyAuthController.checkAuth, verifyAuthController.checkSellerbyFormID, CoBuyFormController.delete);
router.post("/:room_id/saveAccount", verifyAuthController.checkAuth, verifyAuthController.checkSellerbyRoomID, CoBuyFormController.saveAccount);

/* 입금폼 작성 페이지 */
router.get("/:form_id/writeForm", verifyAuthController.checkAuth, CoBuyFormController.writeForm);
router.get("/:form_id/showAccount", verifyAuthController.checkAuth, CoBuyFormController.showAccount);
router.post("/:form_id/submit", verifyAuthController.checkAuth, CoBuyFormController.submit);

/* 입금폼 통계 페이지 */
router.get("/:form_id/depositFormResult", verifyAuthController.checkAuth, verifyAuthController.checkSellerbyFormID, CoBuyFormController.depositFormResult);

module.exports = router;
