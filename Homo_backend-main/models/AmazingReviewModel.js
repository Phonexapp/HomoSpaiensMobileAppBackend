const mongoose=require("mongoose");

const AmazingReviewSchema=new mongoose.Schema({
    ID:{type:mongoose.Types.ObjectId,refpath:"model_type"},
    StorySubject:String,
    Image:String,
    Video:String,
    Freedomwrite:String,
    model_type:{type:String,enum:["users","Business","Institute"]}

})

let AmazingReview=mongoose.model("AmazingReview",AmazingReviewSchema);

module.exports=AmazingReview;