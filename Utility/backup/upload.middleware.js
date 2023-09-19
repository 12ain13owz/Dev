const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log(req.body);
    const code = req.body.code;
    const imagePath = path.join(`public/${code}`);
    if (!fs.existsSync(imagePath)) fs.mkdirSync(imagePath);

    callback(null, imagePath);
  },
  filename: (req, file, callback) => {
    const extension = file.mimetype.split("/").pop();
    const code = req.body.code;
    const imangeName = `${code}.${extension}`;

    callback(null, imangeName);
  },
});

const uploadImage = multer({
  storage: storage,
}).fields([
  {
    name: "images",
    maxCount: 1,
  },
]);

module.exports = uploadImage;
