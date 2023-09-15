const User = require("../../models/Users");


module.exports = async (req, res) => {
    const { userId, targetUserId, action } = req.body;
  
    try {
      const user = await User.findById(userId);
      const targetUser = await User.findById(targetUserId);
  
      if (!user || !targetUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (action === 'follow') {
        if (!user.following.includes(targetUser._id)) {
          user.following.push(targetUser);
          targetUser.followers.push(user);
        }
      } else if (action === 'unfollow') {
        user.following.pull(targetUser);
        targetUser.followers.pull(user);
      } else {
        return res.status(400).json({ message: 'Invalid action' });
      }
  
      await user.save();
      await targetUser.save();
  
      res.json({ message: `User ${action === 'follow' ? 'followed' : 'unfollowed'} successfully` });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  