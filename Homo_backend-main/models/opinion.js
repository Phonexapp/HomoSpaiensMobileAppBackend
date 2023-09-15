const mongoose=require("mongoose");

let OpinionSchema=mongoose.Schema({
    ID:String,
    Title:String,
    Description:{type:String,maxLength:950}
})

let Opinionmodel=mongoose.model("opinion",OpinionSchema);

module.exports=Opinionmodel;