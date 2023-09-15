const resetPassword = (otp) => {
    return {
      subject: `${process.env.APP_NAME} Reset password`,
      html:`<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Password Reset OTP</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              font-size: 16px;
              color: #333;
              line-height: 1.6;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 25px;
              border-radius: 12px;
              border: 1px solid #ddd;
            }
            h1 {
              font-size: 24px;
              font-weight: bold;
              margin-top: 0;
              margin-bottom: 20px;
            }
            p {
              margin-top: 0;
              margin-bottom: 20px;
            }
            a {
              color: #1e88e5;
              text-decoration: none;
            }
            .otp-code {
              display: inline-block;
              padding: 10px;
              background-color: #2B78E5;
              border-radius: 4px;
              font-size: 20px;
              color:#FFF;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Password Reset OTP</h1>
            <p>Hi there,</p>
            <p>We have received a request to reset your password. Please use the following OTP code to reset your password:</p>
            <p class="otp-code">${otp}</p>
            <p>If you did not request this password reset, please ignore this email and your account will remain secure.</p>
            <p>Thank you!</p>
          </div>
        </body>
      </html>
      `
    };
  };
  
  module.exports = { resetPassword };