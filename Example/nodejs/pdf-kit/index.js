const express = require("express");
const app = express();
const port = 3000;

const fs = require("fs");
const PDFDocument = require("pdfkit");
const doc = new PDFDocument({
  title: "Hello World",
  Author: "Admin",
  CreationDate: new Date(),
  autoFirstPage: false
});

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus.  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl.";

doc.pipe(fs.createWriteStream("output.pdf"));
doc.addPage({
  layout: "portrait",
  size: [595, 841],
  margin: 50
});

doc.font("public/fonts/THSarabunNew.ttf");
doc.fontSize(16);

doc
  .image("public/images/Capture.PNG", 50, 50, {
    width: 500,
    height: 400
  })
  .text(lorem, 50, 470);
doc.end();

// const server = app.listen(port => {
//   console.log(`web server listening on port ${port}`);
// });
