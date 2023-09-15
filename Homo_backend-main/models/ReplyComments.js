const { default: mongoose, Schema } = require("mongoose");

const replycommentSchema = new Schema(
  {
    commentId: [{ type: Schema.Types.ObjectId, ref: "comment" }],
    user: {type:Schema.Types.ObjectId,refpath:"model_type"},
    content: String,
    likes: [{ type: Schema.Types.ObjectId, refpath: "model_type" }],
    dislikes: [{ type: Schema.Types.ObjectId, refpath: "model_type" }],
    model_type:{type:String,enum:["users","Business","Institute"]}
  },
  { timestamps: true }
);



  
  replycommentSchema.methods.toggleStatus = function () {
    if (this.status === "active") {
      this.status = "inactive";
    } else {
      this.status = "active";
    }
  };


const Comment = mongoose.model("replycomment", replycommentSchema);
module.exports = Comment;
