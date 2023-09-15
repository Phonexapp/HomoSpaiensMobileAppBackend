const videomodel=require("../models/video.js");

module.exports = async (req, res) => {
    const {ID,Thumbnail,Title,Description,Subtitle}=req.body

    let UserDate=new Date();
    let UserTime=UserDate.getHours() + ":" + UserDate.getMinutes() + ":" + UserDate.getSeconds();


    const Data= new videomodel({
        UserID:ID,
        Thumbnail:Thumbnail,
        Title:Title,
        Description:Description,
        Subtitle:Subtitle,
        video:`${req.file.destination+"/"}`+`${req.file.filename}`,
        Date:UserDate.toJSON().slice(0, 10),
        Time:UserTime
    })
    const DataSave=await Data.save();
    if(DataSave){
        res.status(200).json({Message:"Video Uploaded Sucessfully"});
    }
    else{
        res.status(500).json({Message:"Internal Server Error"});
    }
};