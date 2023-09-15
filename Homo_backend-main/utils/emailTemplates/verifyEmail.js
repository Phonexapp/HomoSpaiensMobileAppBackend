const { PRIMARY_COLOR } = require("../../constants/constants");


module.exports = (name, otp) => {
  // return {
  //   subject: `${process.env.APP_NAME} Verify email`,
  //   html: `<!DOCTYPE html>
  //   <html>
  //     <head>
  //       <meta charset="utf-8" />
  //       <title>You have successfully registered</title>
  //       <style>
  //         /* Base styles */
  //         * {
  //           box-sizing: border-box;
  //           font-family: Arial, sans-serif;
  //         }
  //         body {
  //           margin: 0;
  //           padding: 0;
  //           background-color: #f5f5f5;
  //         }
  //         h1,
  //         h2,
  //         h3 {
  //           margin-top: 0;
  //         }
  //         p {
  //           margin-top: 0;
  //           margin-bottom: 20px;
  //           line-height: 1.5;
  //         }
  //         /* Header */
  //         .header {
  //           background-color: ${PRIMARY_COLOR};
  //           color: #fff;
  //           padding: 20px;
  //           text-align: center;
  //         }
  //         .header h1 {
  //           font-size: 32px;
  //           margin-bottom: 0;
  //         }
  //         /* Content */
  //         .content {
  //           max-width: 600px;
  //           margin: 0 auto;
  //           padding: 20px;
  //           background-color: #fff;
  //           border-radius: 5px;
  //           box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  //           margin-top: 40px;
  //         }
  //         .content p {
  //           font-size: 18px;
  //         }
  //         .content .token {
  //           font-size: 28px;
  //           font-weight: bold;
  //           color: ${PRIMARY_COLOR};
  //         }
  //         .content .cta {
  //           display: inline-block;
  //           background-color: ${PRIMARY_COLOR};
  //           color: #fff;
  //           text-decoration: none;
  //           padding: 10px 20px;
  //           border-radius: 5px;
  //           margin-top: 20px;
  //         }
  //         /* QR Code */
  //         .qr-code {
  //           text-align: center;
  //           margin-top: 20px;
  //         }
  //         .qr-code img {
  //           max-width: 100%;
  //           height: auto;
  //         }
  //         /* Footer */
  //         .footer {
  //           text-align: center;
  //           font-size: 14px;
  //           margin-top: 20px;
  //           color: #888;
  //         }
  //       </style>
  //     </head>
  //     <body>
  //       <div class="header">
  //         <h1>You have successfully registered</h1>
  //       </div>
  //       <div class="content">
  //         <p>Dear ${name},</p>
  //         <p>Thank you for registering with ${process.env.APP_NAME}! To complete your registration process, please use the following token to verify your email address:</p>
  //         <p class="token">Token: ${otp}</p>
  //         <p>Please enter this code on our app to verify your email address and activate your account. If you did not register with us, please ignore this email.</p>
          
  //       </div>
  //       <div class="footer">
  //         <p>If you have any questions or concerns, please don't hesitate to contact our customer support team.</p>
  //         <p>Thank you again for choosing to register with us. We look forward to serving you!</p>
  //         <p>Best regards,</p>
  //         <p>${process.env.APP_NAME}</p>
  //       </div>
  //     </body>
  //   </html>`,
  // };
};
/*<div class="qr-code">
            <img src="https://www.scandit.com/wp-content/uploads/2019/08/Symbology-QR-code.svg" alt="QR Code" />
        </div>*/
