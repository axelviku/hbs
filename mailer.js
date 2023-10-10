const nodemailer = require("nodemailer");
require('dotenv').config();

var main = (to_mail, sub, msg) => {
  const testAccount = nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
  });

  const mailOptions = ({
    from: '"Vikrant Kumar " <xyz@mailinator.com>', // sender address
    to: `${to_mail}`, // list of receivers
    subject: `${sub}`, // Subject line
    text: `${msg}`, // plain text body
  });
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  console.log(to_mail, sub, msg);
}


module.exports = main;