const sharp = require("sharp");
const Jimp = require("jimp");

const express = require("express");

const jpg = "./image/test.jpg";
const png = "./image/test.png";

// Jimp.read(png, function (err, image) {
//   const images = "./image/jimp-test.png";

//   image.write(images, function () {
//     sharp(images).jpeg({ quality: 80 }).toFile("./image/sharp-test.jpg");
//   });
// });

Jimp.read(png)
  .then((data) => {
    return data.quality(80);
  })
  .then((data) => {
    data.write("./image/jimp-test.jpg");
  });

const app = express();

app.listen(3900);
