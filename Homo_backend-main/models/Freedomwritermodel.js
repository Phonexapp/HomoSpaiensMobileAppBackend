const mongoose=require("mongoose");

const FreedomwriterSchema=new mongoose.Schema({
    ID:{type:mongoose.Types.ObjectId,refpath:"model_type"},
    StorySubject:String,
    Image:String,
    Video:String,
    Freedomwrite:String,
    model_type:{type:String,enum:["users","Business","Institute"]}
})

let FreedomModel=mongoose.model("FreedomWriter",FreedomwriterSchema);

module.exports=FreedomModel;