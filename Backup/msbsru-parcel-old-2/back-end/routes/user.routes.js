const express = require("express");
const router = express.Router();
const { authJwt, verify, upload, generate } = require("../middleware/_index");
const controller = require("../controllers/_index");

router.use((req, res, next) => {
  try {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  } catch (error) {
    console.log("Error setHeader :", error.message);
    res.status(404).send("Token expired! Please login.");
  }
});

router.post("/login", controller.account.onLogin);

router.post(
  "/item",
  [
    authJwt.verifyToken,
    authJwt.isActive,
    generate.yearNow,
    upload.image,
    verify.checkDuplicateItem,
    generate.track,
  ],
  controller.item.newItem
);
router.patch(
  "/item",
  [
    authJwt.verifyToken,
    authJwt.isActive,
    generate.yearNow,
    upload.image,
    verify.checkItemID,
  ],
  controller.item.editItem
);
router.get(
  "/sitem",
  [authJwt.verifyToken, authJwt.isActive],
  controller.item.getDataSetItem
);
router.get(
  "/item",
  [authJwt.verifyToken, authJwt.isActive],
  controller.item.getAllItem
);
router.get(
  "/item/:start/:end",
  [authJwt.verifyToken, authJwt.isActive],
  controller.item.getItemByDate
);

router.post(
  "/account",
  [
    authJwt.verifyToken,
    authJwt.isActive,
    authJwt.isAdmin,
    verify.checkDuplicateUsername,
  ],
  controller.account.newAccount
);
router.patch(
  "/account",
  [
    authJwt.verifyToken,
    authJwt.isActive,
    authJwt.isAdmin,
    verify.checkAccountID,
  ],
  controller.account.editAccount
);
router.patch(
  "/account/cpassword",
  [
    authJwt.verifyToken,
    authJwt.isActive,
    authJwt.isAdmin,
    verify.checkAccountID,
  ],
  controller.account.editAccountPassword
);
router.get(
  "/account",
  [authJwt.verifyToken, authJwt.isActive, authJwt.isAdmin],
  controller.account.getAllAccount
);

router.post(
  "/category",
  [
    authJwt.verifyToken,
    authJwt.isActive,
    authJwt.isAdmin,
    verify.checkDuplicateCategory,
  ],
  controller.category.newCategory
);
router.patch(
  "/category",
  [
    authJwt.verifyToken,
    authJwt.isActive,
    authJwt.isAdmin,
    verify.checkCategoryID,
    verify.checkDuplicateCategory,
  ],
  controller.category.editCategory
);
router.get(
  "/category",
  [authJwt.verifyToken, authJwt.isActive, authJwt.isAdmin],
  controller.category.getAllCategory
);

router.post(
  "/status",
  [
    authJwt.verifyToken,
    authJwt.isActive,
    authJwt.isAdmin,
    verify.checkDuplicateStatus,
  ],
  controller.status.newStatus
);
router.patch(
  "/status",
  [
    authJwt.verifyToken,
    authJwt.isActive,
    authJwt.isAdmin,
    verify.checkStatusID,
    verify.checkDuplicateStatus,
  ],
  controller.status.editStatus
);
router.get(
  "/status",
  [authJwt.verifyToken, authJwt.isActive, authJwt.isAdmin],
  controller.status.getAllStatus
);

// router.post(
//   "/product",
//   [authJwt.verifyToken, verify.checkDuplicateProduct],
//   controller.product.newProduct
// );

// router.get("/product/:code", [
//   authJwt.verifyToken,
//   controller.product.getProductByCode,
// ]);
// router.get("/product", [authJwt.verifyToken], controller.product.getAllProduct);
// router.put("/product", [authJwt.verifyToken], controller.product.editProduct);
// router.delete(
//   "/product/:id",
//   [authJwt.verifyToken],
//   controller.product.deleteProduct
// );

router.get("/stock", [authJwt.verifyToken], controller.stock.getAllStock);
router.put("/stock", [authJwt.verifyToken], controller.stock.cutProductStock);

router.post("/generate", [authJwt.verifyToken], controller.generate.getBarCode);

router.get("/test", [authJwt.verifyToken], (req, res) => {
  res.send({ message: "success" });
});

module.exports = router;
