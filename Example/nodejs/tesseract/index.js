const { createWorker } = require("tesseract.js");
const sharp = require("sharp");
const fs = require("fs");

// ฟังก์ชันสำหรับทำ OCR กับรูปภาพ
async function extractTextFromImage(imagePath) {
  // ปรับภาพก่อนการทำ OCR
  const preprocessedImagePath = "preprocessed.png";
  await sharp(imagePath)
    .resize(1024) // ปรับขนาดภาพให้ใหญ่ขึ้นเพื่อให้ OCR แม่นยำขึ้น
    .greyscale()
    .toFile(preprocessedImagePath);

  // ทำ OCR กับภาพที่ปรับแล้ว
  const worker = await createWorker(["eng", "tha"]);
  const {
    data: { text },
  } = await worker.recognize(preprocessedImagePath);
  await worker.terminate();

  return text;
}

// ฟังก์ชันสำหรับดึงข้อมูลเฉพาะจากข้อความที่ได้
function extractSpecificData(text) {
  const lines = text.split("\n");
  console.log(lines);

  let invoiceNumber = "";
  let date = "";
  const tableData = [];

  lines.forEach((line) => {
    // ดึงเลขที่
    if (line.includes("เลขที่:")) {
      const match = line.match(/เลขที่:\s*(\S+)/);
      if (match) {
        invoiceNumber = match[1];
      }
    }

    // ดึงวันที่
    if (line.includes("วันที่:")) {
      const match = line.match(/วันที่:\s*(\S+)/);
      if (match) {
        date = match[1];
      }
    }

    // ดึงข้อมูลตาราง
    const tableRowMatch = line.match(
      /^\d+\s+\S+\s+.+\s+\d+\.\d{2}\s+\d+\s+\d+\.\d{2}\s+\d+\.\d{2}\s+G$/
    );
    if (tableRowMatch) {
      tableData.push(line);
    }
  });

  return { invoiceNumber, date, tableData };
}

// ประมวลผลภาพและแสดงผลลัพธ์
(async () => {
  const imagePath = "bike.png"; // เปลี่ยนเป็นพาธที่แท้จริงของภาพ
  const text = await extractTextFromImage(imagePath);
  const data = extractSpecificData(text);

  console.log("เลขที่:", data.invoiceNumber);
  console.log("วันที่:", data.date);
  console.log("ตารางข้อมูล:");
  console.log(data.tableData.join("\n"));
})();
