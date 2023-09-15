const mongoose=require("mongoose");


const LikeSchema=new mongoose.Schema({
    Id:String,
    count:Number
})


const DislikeSchema=new mongoose.Schema({
    Id:String,
    count:Number
})

const LikeModel=mongoose.model("Like",LikeSchema);
const DislikeModel=mongoose.model("Dislike",DislikeSchema);

module.exports={LikeModel,DislikeModel}
