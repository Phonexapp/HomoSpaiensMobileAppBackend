const {default:mongoose,Schema} = require('mongoose');

const storySchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, refpath: "model_type" },
  image: [{
    type: String,
    required: true,
  }],
  caption: {
    type: String,
    required: true,
  },
  likes: { type: [Schema.Types.ObjectId], refpath: "model_type" },
  // amazing: { type: [Schema.Types.ObjectId], ref: "users" },
  // outstanding: { type: [Schema.Types.ObjectId], ref: "users" },
  dislikes: { type: [Schema.Types.ObjectId], refpath: "model_type" },
  expiresAt: {
    type: Date,
    required: true,
  }, 
  model_type:{type:String,enum:["users","Business","Institute"]}
},
{timestamps:true});

storySchema.methods.toggleStatus = function () {
  if (this.status === "active") {
    this.status = "inactive";
  } else {
    this.status = "active";
  }
};

storySchema.methods.toggleLike = function (userId) {
  const index = this.like.indexOf(userId);
  if (index === -1) {
    // user hasn't liked the post yet, so like it
    this.like.push(userId);
  } else {
    // user has already liked the post, so unlike it
    this.like.splice(index, 1);
  }
};


const Story = mongoose.model('Story', storySchema);

module.exports = Story;
