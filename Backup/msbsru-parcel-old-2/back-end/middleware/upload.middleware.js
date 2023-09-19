const multer = require("multer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    try {
      const year = req.year.toString();
      const imagePath = path.join(`public/${year}`);
      if (!fs.existsSync("public")) fs.mkdirSync("public");
      if (!fs.existsSync(imagePath)) fs.mkdirSync(imagePath);

      callback(null, imagePath);
    } catch (error) {
      callback(new Error(error));
    }
  },

  filename: (req, file, callback) => {
    try {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extension = file.mimetype.split("/").pop();
      const filename = `${uniqueSuffix}.${extension}`;

      callback(null, filename);
    } catch (error) {
      callback(new Error(error));
    }
  },
});

const uploadImage = util.promisify(
  multer({ storage: storage }).single("image")
);

image = async (req, res, next) => {
  try {
    await uploadImage(req, res);

    if (req.file) {
      const year = req.year.toString();
      const filename = req.file.filename;
      req.imagePath = path.join(year, filename);
    }

    next();
  } catch (error) {
    console.log("Error image : ", error.message);
    res.status(400).send("Error (400)! อัพโหลดรูปไม่สำเร็จ");
  }
};

removeImage = (path) => {
  try {
    if (path) fs.unlinkSync(path);
  } catch (error) {
    console.log("Error removeImage : ", error.message);
    res.status(400).send("Error (400)! อัพโหลดรูปไม่สำเร็จ");
  }
};

const upload = {
  image: image,
  removeImage: removeImage,
};

module.exports = upload;
