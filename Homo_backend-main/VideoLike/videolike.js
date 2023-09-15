
const { LikeModel } = require("../models/LikeDislike.js");
const { DislikeModel } = require("../models/LikeDislike.js");


module.exports = async (req, res) => {
    let countvalue = 1;
    const UserLikeData = await LikeModel.findOne().sort('-_id');
    const UserDisLikeData = await DislikeModel.findOne().sort('-_id');

    const { ID, count, Action } = req.body
    if (Action == "Like") {

        if (UserLikeData == null) {
            const Data = new LikeModel({
                ID: ID,
                count: countvalue,
            })
            const DataSave = await Data.save();
        }

        if (UserLikeData !== null) {
            const LikedData = new LikeModel({
                count: UserData.count + 1,
            })
            const LikedDataSave = await LikedData.save();
        }
    }
    else if (Action == "DisLike") {
        if (UserDisLikeData == null) {
            const Data = new DislikeModel({
                ID: ID,
                count: countvalue,
            })
            const DataSave = await Data.save();
        }

        if (UserDisLikeData !== null) {
            const DisLikedData = new DislikeModel({
                count: UserData.count + 1,
            })
            const LikedDataSave = await DisLikedData.save();
        }
    }
}
