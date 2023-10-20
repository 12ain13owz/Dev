const express = require("express");
const JsBarcode = require("jsbarcode");
const { jsPDF } = require("jspdf");
const {
  createCanvas,
  loadImage,
  createImageData,
  registerFont,
  Image,
  Canvas,
} = require("canvas");
const { Buffer } = require("buffer");

const fs = require("fs");
const path = require("path");

const app = express();
const public = path.join(__dirname, "public");
app.use("/", express.static(public));

const server = app.listen(3000, () => {
  console.log(`CORS-enabled web server listening on port 3000`);
});

app.get("/", (req, res) => {
  res.send({ message: "test" });
});

const canvas = new Canvas(100, 100, "png");

JsBarcode(canvas, "mou-145", {
  format: "CODE128",
  lineColor: "#000",
  width: 2,
  height: 50,
  displayValue: true,
});

//const doc = new jsPDF();

var doc = new jsPDF("p", "mm", "a4");
var width = doc.internal.pageSize.getWidth();
var height = doc.internal.pageSize.getHeight();

doc.addImage(canvas.toBuffer(), "png", 5, 5, 50, 30);
doc.addImage(canvas.toBuffer(), "png", 80, 5, 50, 30);
doc.addImage(canvas.toBuffer(), "png", 155, 5, 50, 30);
doc.addImage(canvas.toBuffer(), "png", 5, 45, 50, 30);
doc.addImage(canvas.toBuffer(), "png", 5, 85, 50, 30);
doc.addImage(canvas.toBuffer(), "png", 5, 125, 50, 30);
doc.addImage(canvas.toBuffer(), "png", 5, 165, 50, 30);
doc.addImage(canvas.toBuffer(), "png", 5, 205, 50, 30);
doc.addImage(canvas.toBuffer(), "png", 5, 245, 50, 30);
doc.addImage(canvas.toBuffer(), "png", 155, 245, 50, 30);
//doc.save("public/a4.pdf");

// doc.addPage();
// doc.setPage(2);
// doc.addImage(canvas.toBuffer(), "png", 5, 5, 50, 30);
// doc.addImage(canvas.toBuffer(), "png", 80, 5, 50, 30);
// doc.addImage(canvas.toBuffer(), "png", 155, 5, 50, 30);

//let buffer = doc.output("arraybuffer");
// const buffer = Buffer.from(out.toString(), "base64");
// const b64 = buffer.toString("base64");
//fs.writeFileSync("public/out1.pdf", out);

let out = doc.output();
//const buffer = btoa(out);
const buffer = Buffer.from(out, "binary").toString("base64");

//fs.writeFile("public/out.pdf", buffer, "base64", (err) => {});

function arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
