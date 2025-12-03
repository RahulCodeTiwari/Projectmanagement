import nodemailer from "nodemailer";

const sendEmail = async (to, subject, message) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `Project Management <${process.env.MAIL_USER}>`,
    to,
    subject,
    text: message,
  });
};

export default sendEmail;
