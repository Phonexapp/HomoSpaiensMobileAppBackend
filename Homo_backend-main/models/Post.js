const { default: mongoose, Schema } = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    caption: { type: String },
    media: [
      { 
        type: String,
      },
    ],
    likes: { type: [Schema.Types.ObjectId], refpath: "model_type" },
  amazing: { type: [Schema.Types.ObjectId], refpath: "model_type" },
  outstanding: { type: [Schema.Types.ObjectId], refpath: "model_type" },
  dislikes: { type: [Schema.Types.ObjectId], refpath: "model_type" },
    user: { type: Schema.Types.ObjectId, refpath: "model_type" },
    model_type:{type:String,enum:["users","Business","Institute"]}
    // status: {
    //   type: String,
    //   enum: ["active", "inactive", "deleted"],
    //   default: "active",
    // },
  },
  { timestamps: true }
);

postSchema.methods.toggleStatus = function () {
  if (this.status === "active") {
    this.status = "inactive";
  } else {
    this.status = "active";
  }
};

postSchema.methods.toggleLike = function (userId) {
  const index = this.like.indexOf(userId);
  if (index === -1) {
    // user hasn't liked the post yet, so like it
    this.like.push(userId);
  } else {
    // user has already liked the post, so unlike it
    this.like.splice(index, 1);
  }
}

module.exports = mongoose.model("Post", postSchema);
