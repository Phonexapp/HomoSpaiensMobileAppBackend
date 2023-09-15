const { default: mongoose, Schema } = require("mongoose");



const commentSchema = new Schema(
  {
    post: { type:Schema.Types.ObjectId,ref:"Post" },
    user: {type:Schema.Types.ObjectId,refpath:"model_type"},
    content: [{type: String,}],
    likes: [{ type: Schema.Types.ObjectId, refpath: "model_type" }],
    dislikes: [{ type: Schema.Types.ObjectId, refpath: "model_type" }],
    model_type:{type:String,enum:["users","Business","Institute"]}
  },
  { timestamps: true }
);

commentSchema.methods.toggleStatus = function () {
  if (this.status === "active") {
    this.status = "inactive";
  } else {
    this.status = "active";
  }
};

const Comment = mongoose.model("comment", commentSchema);
module.exports = Comment;
