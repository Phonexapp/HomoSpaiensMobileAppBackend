
const User = require('../../models/Users');
const BusinessModel = require('../../models/BusinessAccountModel.js');
const InstituteModel = require('../../models/InstituteAccountModel.js');


module.exports = async (req, res) => {
  const { AccountType, userId, reelId, action } = req.body;
  if (AccountType == "Personal") {
    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (action === 'save') {
        if (user.savedReels.includes(reelId)) {
          return res.status(400).json({ message: 'Reel is already saved' });
        }

        user.savedReels.push(reelId);
        await user.save();

        res.json({ message: 'Reel saved successfully' });
      } else if (action === 'unsave') {
        if (!user.savedReels.includes(reelId)) {
          return res.status(400).json({ message: 'Reel is not saved' });
        }

        user.savedReels.pull(reelId);
        await user.save();

        res.json({ message: 'Reel unsaved successfully' });
      } else {
        return res.status(400).json({ message: 'Invalid action' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  else if (AccountType == "Business") {
    try {
      const user = await BusinessModel.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (action === 'save') {
        if (user.savedReels.includes(reelId)) {
          return res.status(400).json({ message: 'Reel is already saved' });
        }

        user.savedReels.push(reelId);
        await user.save();

        res.json({ message: 'Reel saved successfully' });
      } else if (action === 'unsave') {
        if (!user.savedReels.includes(reelId)) {
          return res.status(400).json({ message: 'Reel is not saved' });
        }

        user.savedReels.pull(reelId);
        await user.save();

        res.json({ message: 'Reel unsaved successfully' });
      } else {
        return res.status(400).json({ message: 'Invalid action' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  else if (AccountType == "Institute") {
    try {
      const user = await InstituteModel.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (action === 'save') {
        if (user.savedReels.includes(reelId)) {
          return res.status(400).json({ message: 'Reel is already saved' });
        }

        user.savedReels.push(reelId);
        await user.save();

        res.json({ message: 'Reel saved successfully' });
      } else if (action === 'unsave') {
        if (!user.savedReels.includes(reelId)) {
          return res.status(400).json({ message: 'Reel is not saved' });
        }

        user.savedReels.pull(reelId);
        await user.save();

        res.json({ message: 'Reel unsaved successfully' });
      } else {
        return res.status(400).json({ message: 'Invalid action' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  else {
    res.status(204).json({ Message: "User Not Found" });
  }
};

