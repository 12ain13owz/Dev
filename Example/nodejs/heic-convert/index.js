const fs = require("fs");
const path = require("path");
const convert = require("heic-convert");
const progress = require("progress");
const dirImages = path.join(__dirname, "images");
const dirUploads = path.join(__dirname, "uploads");

const files = fs.readdirSync(dirImages);
let bar = new progress(":percent", { total: files.length });

const convertBuffer = async () => {
  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(dirImages, files[i]);
    const fileName = files[i].split(".")[0];
    const fileUpload = `${path.join(dirUploads)}/${fileName}.png`;
    const inputBuffer = fs.readFileSync(filePath);
    const outputBuffer = await convert({
      buffer: inputBuffer,
      format: "PNG",
    });

    fs.writeFileSync(fileUpload, outputBuffer);
    bar.tick();
    if (bar.complete) console.log("complete");
  }
};

//convertBuffer();
