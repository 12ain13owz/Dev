const fs = require("fs");
const path = require("path");
const convert = require("heic-convert");
const progress = require("progress");
const dirHeicImages = path.join(__dirname, "heic_images");
const dirPngImages = path.join(__dirname, "png_images");

const files = fs.readdirSync(dirHeicImages);
let bar = new progress(":percent", { total: files.length });

const convertBuffer = async () => {
  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(dirHeicImages, files[i]);
    const fileName = files[i].split(".")[0];
    const fileUpload = `${path.join(dirPngImages)}/${fileName}.png`;
    const inputBuffer = fs.readFileSync(filePath);

    try {
      const outputBuffer = await convert({
        buffer: inputBuffer,
        format: "PNG",
      });

      fs.writeFileSync(fileUpload, outputBuffer);
      if (bar.complete) console.log("complete");
    } catch (error) {
      fs.writeFileSync(fileUpload, inputBuffer);
    }
    bar.tick();
  }
};

convertBuffer();
