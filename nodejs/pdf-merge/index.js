// วิธีที่ 1: ใช้ ES Modules
import PDFMerger from "pdf-merger-js";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function mergePDFs() {
  try {
    // สร้าง instance ของ PDFMerger
    const merger = new PDFMerger();

    // อ่านไฟล์ทั้งหมดจาก folder pdfs
    const pdfFolder = path.join(__dirname, "pdfs");
    const files = await fs.readdir(pdfFolder);

    // กรองเอาเฉพาะไฟล์ .pdf
    const pdfFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === ".pdf"
    );

    if (pdfFiles.length === 0) {
      console.log("ไม่พบไฟล์ PDF ใน folder pdfs");
      return;
    }

    // เพิ่มไฟล์ PDF แต่ละไฟล์เข้าไปใน merger
    for (const file of pdfFiles) {
      const filePath = path.join(pdfFolder, file);
      await merger.add(filePath);
      console.log(`เพิ่มไฟล์: ${file}`);
    }

    // กำหนดชื่อไฟล์ output และวันที่
    const date = new Date().toISOString().split("T")[0];
    const outputPath = path.join(__dirname, `merged_${date}.pdf`);

    // บันทึกไฟล์ที่รวมแล้ว
    await merger.save(outputPath);
    console.log(`รวมไฟล์ PDF เสร็จสิ้น: ${outputPath}`);
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error.message);
  }
}

// เรียกใช้ฟังก์ชัน
mergePDFs();
