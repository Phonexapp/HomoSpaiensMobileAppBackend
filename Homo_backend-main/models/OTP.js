const { default: mongoose, Schema } = require("mongoose");

const OTPSchema = new Schema(
    {
        otp: String,
        expirationTime: Date,
        verified: {
            type: Boolean,
            default: false,
        },
        email:String
    },
    { timestamps: true }
);

const OTP = mongoose.model("otp", OTPSchema);
module.exports = OTP;