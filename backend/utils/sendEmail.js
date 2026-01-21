// import nodemailer from "nodemailer";
// import dotenv from "dotenv"
// dotenv.config()
// const sendEmail = async (options) => {
//   const transporter = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//       // user: process.env.SMTP_USER,
//       // pass: process.env.SMTP_PASS,
//       user:"damit9963@gmail.com",
//       pass:"ccwy vfiw pvjt lzfs",
//     },
//   });

//   const mailOptions = {
//     // from: process.env.SMTP_USER,
//     from:"damit9963@gmail.com",
//     to: options.email,  // ✅ Correct field name
//     subject: options.subject,
//     text: options.message,
//   };

//   await transporter.sendMail(mailOptions);
// };

// export default sendEmail;


import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "damit9963@gmail.com",
      pass: "ccwy vfiw pvjt lzfs",
    },
  });

  const mailOptions = {
    from: "damit9963@gmail.com",
    to: options.to, // ✅ Ensure this is correct
    subject: options.subject,
    html: options.message, // ✅ Use 'html' for HTML content
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;