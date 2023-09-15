const { default: mongoose, Schema } = require("mongoose");

const reelSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, refpath: "model_type" },
  caption: {type: String, required: true,},
  image: [ {type: String, required: true,},],
  duration: {
    type: Number,
    default: 60, // Set default duration to 60 seconds (1 minute)
  },
  likes: { type: [Schema.Types.ObjectId], refpath: "model_type" },
  amazing: { type: [Schema.Types.ObjectId], refpath: "model_type" },
  outstanding: { type: [Schema.Types.ObjectId], refpath: "model_type" },
  dislikes: { type: [Schema.Types.ObjectId], refpath: "model_type" },
  model_type:{type:String,enum:["users","Business","Institute"]}
},
{timestamps:true}
);


reelSchema.methods.toggleStatus = function () {
    if (this.status === "active") {
      this.status = "inactive";
    } else {
      this.status = "active";
    }
  };
  
  reelSchema.methods.toggleLike = function (userId) {
    const index = this.like.indexOf(userId);
    if (index === -1) {
      // user hasn't liked the post yet, so like it
      this.like.push(userId);
    } else {
      // user has already liked the post, so unlike it
      this.like.splice(index, 1);
    }
  };


const Reel = mongoose.model("Reel", reelSchema);

module.exports = Reel;
