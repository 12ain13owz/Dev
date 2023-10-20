import config from "config";
import nodemailer, { SendMailOptions } from "nodemailer";
import log from "./logger";

// async function createTestCreads() {
//   const creds = await nodemailer.createTestAccount();
//   console.log({ creds });
// }
// createTestCreads();

const smpt = config.get<{
  user: string;
  pass: string;
  host: string;
  port: number;
  secure: boolean;
}>("smpt");

const transporter = nodemailer.createTransport({
  ...smpt,
  auth: { user: smpt.user, pass: smpt.pass },
});

async function sendEmail(payload: SendMailOptions) {
  transporter.sendMail(payload, (err, info) => {
    if (err) return log.error(err, "Error sending email");
    log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  });
}

export default sendEmail;
