"use strict";
const nodemailer = require("nodemailer");
const { pugEngine } = require("nodemailer-pug-engine")
const SMTP_CONFIG = require('./smtp')

module.exports = {
    // async..await is not allowed in global scope, must use a wrapper
async mailSender(token, email) {
    try {
        // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //let testAccount = await nodemailer.createTestAccount();
      console.log('Testing mail send: ', SMTP_CONFIG.user, SMTP_CONFIG.password)
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: SMTP_CONFIG.host,
      port: SMTP_CONFIG.port,
      secure: false, // true for 465, false for other ports
      auth: {
        user: SMTP_CONFIG.user, 
        pass: SMTP_CONFIG.password, 
      },
    });

    transporter.use('compile',pugEngine({
        templateDir:'./resources/mail',
    }))
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from:`${SMTP_CONFIG.name} <${SMTP_CONFIG.user}>`,
      to: [email],
      subject: "Recuperação de senha ✔",
      template: 'requestNewPasswd',
      ctx: {
        token,
        email
    }
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou..
    } catch (error) {
        console.log(error)
    }
  }
  
}