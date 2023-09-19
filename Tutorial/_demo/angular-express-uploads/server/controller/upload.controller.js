const db = require("../model/_index");
const fs = require("fs");
const { Buffer } = require("buffer");

onUploadImage = async (req, res) => {
  const extension = req.file.mimetype.split("/").pop();
  const imageName = `test1.${extension}`;
  const imagePath = "public/upload/";

  const buffer = Buffer.from(req.file.buffer, "binary").toString("base64");
  const result = fs.writeFileSync(`${imagePath}${imageName}`, buffer, "base64");

  res.send({ message: "upload" });
};

const upload = {
  onUploadImage: onUploadImage,
};

module.exports = upload;
