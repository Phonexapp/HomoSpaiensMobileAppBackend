const mogoonse = require("mongoose");

const InstituteSchema = new mogoonse.Schema({
  Universityname: String,
  Institutetype: String,
  Displayname: String,
  Foundeddate: String,
  Email: String,
  Country: String,
  City: String,
  avatar: String,
  Password: String,
  RePassword: String,
  role: {
    type: String,
    enum: ["personal", "business", "institute", "admin"],
    default: "institute",
  },
  followers: [{ type: mogoonse.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mogoonse.Schema.Types.ObjectId, ref: 'User' }],
  blockedUsers: [{ type: mogoonse.Schema.Types.ObjectId, ref: 'User' }],
  reports: [{
    reportedUserId: { type: mogoonse.Schema.Types.ObjectId, ref: 'User', },
    reason: { type: mogoonse.Schema.Types.ObjectId, required: true, },
    details: mogoonse.Schema.Types.ObjectId,
  },],
  sharedReels: [{ type: mogoonse.Schema.Types.ObjectId, ref: 'Reel' }],
  savedReels: [{ type: mogoonse.Schema.Types.ObjectId, ref: 'Reel' }],
  sharedPosts: [{ type: mogoonse.Schema.Types.ObjectId, ref: 'Post' }],
  savedPosts: [{ type: mogoonse.Schema.Types.ObjectId, ref: 'Post' }],
  sharedVideo: [{ type: mogoonse.Schema.Types.ObjectId, ref: 'videos'}],
  savedVideo: [ {type: mogoonse.Schema.Types.ObjectId, ref: 'videos'}],
  instituteDetails: { type: mogoonse.Schema.Types.ObjectId, ref: "instituteDetails" },
},

  { timestamps: true }
)

let InstituteModel = mogoonse.model("Institute", InstituteSchema);

module.exports = InstituteModel;