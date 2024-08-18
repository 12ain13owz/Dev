const fs = require("fs");
const puppeteer = require("puppeteer");

// ข้อมูล mockup
const data = {
  name: "นางสาวอรทัย สุขสันต์",
  policyNumber: "987654321",
  startDate: "01/01/2024",
  endDate: "31/12/2044",
  details: "กรมธรรม์ประกันชีวิตแบบสะสมทรัพย์ 20 ปี",
  sumAssured: "1,000,000 บาท",
  premium: "20,000 บาทต่อปี",
  beneficiary: "นายสมชาย สุขสันต์ (สามี)",
};

// อ่านไฟล์ HTML เทมเพลต
let template = fs.readFileSync("template.html", "utf8");

// แทนที่ข้อมูลในเทมเพลต
template = template
  .replace("{{name}}", data.name)
  .replace("{{policyNumber}}", data.policyNumber)
  .replace("{{startDate}}", data.startDate)
  .replace("{{endDate}}", data.endDate)
  .replace("{{details}}", data.details)
  .replace("{{sumAssured}}", data.sumAssured)
  .replace("{{premium}}", data.premium)
  .replace("{{beneficiary}}", data.beneficiary);

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(template);
  await page.pdf({ path: "policy.pdf", format: "A4" });
  await browser.close();
  console.log("PDF สร้างเรียบร้อยแล้ว");
})();
