const moment = require("moment");
const OTP = require("../../models/OTP");
const User = require("../../models/Users");

module.exports = (req, res) => {
    const { otp, password } = req.body;
    OTP.findOne({ otp, expirationTime: { $gt: moment() } })
        .then(async (otpDoc) => {
            console.log(otpDoc);
            if (!otpDoc) {
                return res.status(400).json({ message: "Invalid OTP or OTP expired" });
            }
            const user = await User.findOne({email:otpDoc.email});
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }
            user.setPassword(password);
            await user.save();
            await OTP.deleteOne({ _id: otpDoc._id });
            res.json({ message: "Password reset successfully" });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: error.message, message: "Failed to reset password" });
        });
};
