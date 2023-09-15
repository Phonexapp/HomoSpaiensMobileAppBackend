const { default:mongoose,Schema, model } = require("mongoose");
const crypto = require("crypto");

const UserSchema = new Schema(
  {
    email: { type: String, require: true },
    firstname: String,
    lastname: String,
    displayname: String,
    country: String,
    city: String,
    avatar: String,
    phone: String,
    role: {
      type: String,
      enum: ["personal", "business", "institute", "admin"],
      default: "personal",
    },
    // isBlocked: {
    //   type: Boolean,
    //   default: false,
    // },
    // dob: { type: Schema.Types.Date, require: true },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    reports: [{ reportedUserId: {   type: mongoose.Schema.Types.ObjectId,ref: 'User',   },
        reason: {  type: String, required: true, },
        details: String, }, ],
    sharedReels: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Reel'}],
    savedReels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reel'}],
    sharedPosts: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    sharedVideo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'videos'}],
    savedVideo: [ {type: mongoose.Schema.Types.ObjectId, ref: 'videos'}],
    personalDetails: { type: Schema.Types.ObjectId, ref: "personalDetails" },
    hash: { type: String, require: true },
    salt: { type: String, require: true },
    deviceTokens: [String],
  },
  
  { timestamps: true }
);

UserSchema.methods.setPassword = function (password) {
  // Creating a unique salt for a particular user
  this.salt = crypto.randomBytes(16).toString("hex");
  // Hashing user's salt and password with sha512 algorithm,
  const hash = crypto.createHmac("sha512", this.salt);
  hash.update(password);
  this.hash = hash.digest("hex");
};

// Method to check the entered password is correct or not
UserSchema.methods.validPassword = function (password) {
  const hash = crypto.createHmac("sha512", this.salt);
  hash.update(password);
  const passwordHash = hash.digest("hex");
  return passwordHash === this.hash;
};

// Method to get shared reels
UserSchema.methods.getSharedReels = async function() {
  const populatedUser = await this.populate('sharedReels').execPopulate();
  return populatedUser.sharedReels;
};

module.exports = model("users", UserSchema);
