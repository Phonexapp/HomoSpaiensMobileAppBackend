const UserModel = require("../models/Users.js");
const BusinessModel = require("../models/BusinessAccountModel.js");
const InstituteModel = require("../models/InstituteAccountModel.js");
const VideoModel = require("../models/video.js");


module.exports = async (req, res) => {
    const { AccountType, UserID, TargetUserId, VideoID } = req.body;

    if (AccountType == "Personal") {
        let UserId = await UserModel.findById(UserID);
        let VideoId = await VideoModel.findById(VideoID);
        let TargetIdUser = await UserModel.findById(TargetUserId);

        if (!UserId || !VideoId || !TargetIdUser) {
            return res.status(404).json({ message: 'User, Reel, or Target User not found' });
        }

        if (!TargetIdUser.sharedVideo.includes(VideoId)) {
            // Share the reel with the target user
            TargetIdUser.sharedVideo.push(VideoId);
            await TargetIdUser.save();
            res.json({ message: 'Video shared successfully' });
        }
        else if (TargetIdUser.sharedVideo.includes(VideoId)) {
            return res.status(400).json({ message: 'Video is already shared with the target user' });
        }
    }
    else if (AccountType == "Business") {
        let UserId = await BusinessModel.findById(UserID);
        let VideoId = await VideoModel.findById(VideoID);
        let TargetIdUser = await BusinessModel.findById(TargetUserId);

        if (!UserId || !VideoId || !TargetIdUser) {
            return res.status(404).json({ message: 'User, Reel, or Target User not found' });
        }

        if (!TargetIdUser.sharedVideo.includes(VideoId)) {
            // Share the reel with the target user
            TargetIdUser.sharedVideo.push(VideoId);
            await TargetIdUser.save();
            res.json({ message: 'Video shared successfully' });
        }
        else if (TargetIdUser.sharedVideo.includes(VideoId)) {
            return res.status(400).json({ message: 'Video is already shared with the target user' });
        }
    }
    else if (AccountType == "Institute") {
        let UserId = await InstituteModel.findById(UserID);
        let VideoId = await VideoModel.findById(VideoID);
        let TargetIdUser = await InstituteModel.findById(TargetUserId);

        if (!UserId || !VideoId || !TargetIdUser) {
            return res.status(404).json({ message: 'User, Reel, or Target User not found' });
        }

        if (!TargetIdUser.sharedVideo.includes(VideoId)) {
            // Share the reel with the target user
            TargetIdUser.sharedVideo.push(VideoId);
            await TargetIdUser.save();
            res.json({ message: 'Video shared successfully' });
        }
        else if (TargetIdUser.sharedVideo.includes(VideoId)) {
            return res.status(400).json({ message: 'Video is already shared with the target user' });
        }
    }
    else {
        res.status(204).json({ Message: "Account Not Found" });
    }
}