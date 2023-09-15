const mognoose = require("mongoose");
let BusinessSchema = new mognoose.Schema({
    Companyname: String,
    Businesstype: String,
    Displayname: String,
    Foundeddate: String,
    Email: String,
    Country: String,
    City: String,
    avatar: String,
    Password: String,
    Repassword: String,
    role: {
        type: String,
        enum: ["personal", "business", "institute", "admin"],
        default: "business",
    },
    followers: [{ type: mognoose.Schema.Types.ObjectId, ref: 'Business' }],
    following: [{ type: mognoose.Schema.Types.ObjectId, ref: 'Business' }],
    blockedUsers: [{ type: mognoose.Schema.Types.ObjectId, ref: 'Business' }],
    reports: [{
        reportedUserId: { type: mognoose.Schema.Types.ObjectId, ref: 'Business', },
        reason: { type: String, required: true, },
        details: String,
    },],
    sharedReels: [{ type: mognoose.Schema.Types.ObjectId, ref: 'Reel' }],
    savedReels: [{ type: mognoose.Schema.Types.ObjectId, ref: 'Reel' }],
    sharedPosts: [{ type: mognoose.Schema.Types.ObjectId, ref: 'Post' }],
    savedPosts: [{ type: mognoose.Schema.Types.ObjectId, ref: 'Post' }],
    sharedVideo: [{ type: mognoose.Schema.Types.ObjectId, ref: 'videos'}],
    savedVideo: [ {type: mognoose.Schema.Types.ObjectId, ref: 'videos'}],
    businessDetails: { type: mognoose.Schema.Types.ObjectId, ref: "Business" },
},

    { timestamps: true }
)

let BusinessModel = mognoose.model("Business", BusinessSchema);

module.exports = BusinessModel;