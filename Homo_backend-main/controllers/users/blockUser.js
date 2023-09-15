// userController.js
const User = require('../../models/Users');

// Controller function to block/unblock a user
async function updateUserStatus(req, res) {
  const { id } = req.params;
  const { isBlocked } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isBlocked = isBlocked;
    await user.save();

    const status = isBlocked ? 'blocked' : 'unblocked';
    res.status(200).json({ message: `User ${status} successfully` });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  updateUserStatus,
};
