// controllers/userController.js

const User = require('../../models/Users');

module.exports = async (req, res) => {
  const { userId, targetUserId, action } = req.body;

  try {
    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!user || !targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (action === 'block') {
      if (user.blockedUsers.includes(targetUserId)) {
        return res.status(400).json({ message: 'User is already blocked' });
      }

      user.blockedUsers.push(targetUserId);
    } else if (action === 'unblock') {
      if (!user.blockedUsers.includes(targetUserId)) {
        return res.status(400).json({ message: 'User is not blocked' });
      }

      user.blockedUsers.pull(targetUserId);
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }

    await user.save();

    res.json({ message: `User ${action}ed successfully` });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
