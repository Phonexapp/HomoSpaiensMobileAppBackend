
const { DislikeModel } = require("../models/LikeDislike.js");

module.exports = async (req, res) => {
    let countvalue = 1;
    const UserData = await DislikeModel.findOne().sort('-_id');
    const { ID, count } = req.body
    if (UserData == null) {
        const Data =  new DislikeModel({
            ID: ID,
            count: countvalue,
        })
        const DataSave = await Data.save();
    }
    
    if(UserData!==null){
        const LikedData =  new DislikeModel({
            count: UserData.count+1,
        })
        const LikedDataSave = await LikedData.save();
    }
};
