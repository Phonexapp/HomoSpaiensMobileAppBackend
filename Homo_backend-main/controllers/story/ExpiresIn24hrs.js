const Story = require("../../models/Story");

// Delete expired stories
exports.deleteExpiredStories = async (req,res,next) => {
  try {
    const currentTime = new Date();
    await Story.deleteMany({ expiresAt: { $lt: currentTime } });
    console.log('Expired stories have been deleted');
    next()
  } catch (error) {
    console.error('Failed to delete expired stories:', error);
  }
};
