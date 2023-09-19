const express = require("express");
const router = express.Router();
const controller = require("../controller/_index");
const multer = require("multer");

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

router.post(
  "/upload",
  multer().single("image"),
  controller.upload.onUploadImage
);

module.exports = router;
