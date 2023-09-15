const AmazingReviewmodel=require("../models/AmazingReviewModel.js");

module.exports=async(req,res)=>{
    const {UserID,UserStorysubject,UserFreedomWrite}=req.body;
    if(req.files[0].mimetype == "video/mp4"){
        const Data= new AmazingReviewmodel({
            ID:UserID,
            StorySubject:UserStorysubject,
            Video:`${req.files[0].destination+"/"}`+`${req.files[0].filename}`,
            Freedomwrite:UserFreedomWrite
        })
        const DataSave=await Data.save();
        console.log(DataSave);
        res.status(200).json({Message:"Video Uploaded"});
    }
    else if(req.files[0].mimetype == "image/jpeg"){
        const Data= new AmazingReviewmodel({
            ID:UserID,
            StorySubject:UserStorysubject,
            Image:`${req.files[0].destination+"/"}`+`${req.files[0].filename}`,
            Freedomwrite:UserFreedomWrite
        })
        const DataSave=await Data.save();
        console.log(DataSave);    
        res.status(200).json({Message:"Image Uploaded"});
    }
    else{
        res.status(204).json({Message:"Pls Upload Image/Video"});
    }
}