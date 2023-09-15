const express = require("express");
var otpGenerator = require("otp-generator");
const moment = require("moment");
const { resetPassword } = require("../../utils/emailTemplates/resetPassword");
const { sendmail } = require("../../services/sendMail");
const OTP = require("../../models/OTP");

/**
 *
 * @param {express.request} req
 * @param {express.response } res
 */
module.exports = async (req, res) => {
  const { email } = req.body;
  const otp = otpGenerator.generate(6, {
    alphabets: false,
    upperCase: false,
    specialChars: false,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
  });
  const expirationTime = moment().add("10", "M");
  await OTP.create({ otp, expirationTime,email });
  const { html, subject } = resetPassword(otp);
  sendmail({
    from: `<${process.env.EMAIL_ADDRESS}>`,
    to: `${email}`,
    subject,
    html,
  })
    .then((response) => {
      res.json({ message: "Email sent successfully" });
    })
    .catch((error) => {
      res.status(400).json({ error, message: "Failed to send email" });
    });
};