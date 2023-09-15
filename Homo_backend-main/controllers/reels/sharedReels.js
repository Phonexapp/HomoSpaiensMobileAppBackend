// controllers/reelController.js

const User = require('../../models/Users');
const Reel = require('../../models/Reels');
const BusinessModel = require('../../models/BusinessAccountModel.js');
const InstituteModel = require('../../models/InstituteAccountModel.js');


module.exports = async (req, res) => {
  const { AccountType, userId, reelId, targetUserId } = req.body;
  if (AccountType == "Personal") {
    try {
      const user = await User.findById(userId);
      const reel = await Reel.findById(reelId);
      const targetUser = await User.findById(targetUserId);

      if (!user || !reel || !targetUser) {
        return res.status(404).json({ message: 'User, Reel, or Target User not found' });
      }

      if (!targetUser.sharedReels.includes(reelId)) {
        // Share the reel with the target user
        targetUser.sharedReels.push(reelId);
        await targetUser.save();
        res.json({ message: 'Reel shared successfully' });
      }
      else if (targetUser.sharedReels.includes(reelId)) {
        return res.status(400).json({ message: 'Reel is already shared with the target user' });
      }

      // const sharedReels = await targetUser.getSharedReels();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  else if (AccountType == "Business") {

    try {
      const user = await BusinessModel.findById(userId);
      const reel = await Reel.findById(reelId);
      console.log("Reel", reel);
      const targetUser = await BusinessModel.findById(targetUserId);

      if (!user || !reel || !targetUser) {
        return res.status(404).json({ message: 'User, Reel, or Target User not found' });
      }

      // Check if the reel is already shared with the target user
      if (!targetUser.sharedReels.includes(reelId)) {
        // Share the reel with the target user
        targetUser.sharedReels.push(reelId);
        await targetUser.save();
        res.json({ message: 'Reel shared successfully' });
      }
      else if (targetUser.sharedReels.includes(reelId)) {
        return res.status(400).json({ message: 'Reel is already shared with the target user' });
      }
      // const sharedReels = await targetUser.getSharedReels();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  else if (AccountType == "Institute") {
    try {
      const user = await InstituteModel.findById(userId);
      const reel = await Reel.findById(reelId);
      const targetUser = await InstituteModel.findById(targetUserId);

      if (!user || !reel || !targetUser) {
        return res.status(404).json({ message: 'User, Reel, or Target User not found' });
      }

      if (!targetUser.sharedReels.includes(reelId)) {
        // Share the reel with the target user
        targetUser.sharedReels.push(reelId);
        await targetUser.save();
        res.json({ message: 'Reel shared successfully' });
      }
      else if (targetUser.sharedReels.includes(reelId)) {
        return res.status(400).json({ message: 'Reel is already shared with the target user' });
      }
      // const sharedReels = await targetUser.getSharedReels();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  else {
    res.status(204).send({ Message: "No Account Found" });
  }
};
