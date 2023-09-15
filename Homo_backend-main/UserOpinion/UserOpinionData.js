const Opinionmodel=require("../models/opinion.js");
module.exports=async(req,res)=>{
    console.log(req);
    const {UserID,UserTitle,UserDescription}=req.body;
    let Data= new Opinionmodel({
        ID:UserID,
        Title:UserTitle,
        Description:UserDescription
    })

    let DataSave=await Data.save();
    console.log(DataSave);
}