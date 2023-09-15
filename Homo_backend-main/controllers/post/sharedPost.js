// controllers/reelController.js

const User = require('../../models/Users');
const BusinessModel = require('../../models/BusinessAccountModel.js');
const InstituteModel = require('../../models/InstituteAccountModel.js');
const Post = require('../../models/Post');

module.exports = async (req, res) => {
  const { AccountType, userId, postId, targetUserId } = req.body;
  if (AccountType == "Personal") {
    try {
      const user = await User.findById(userId);
      const post = await Post.findById(postId);
      const targetUser = await User.findById(targetUserId);

      if (!user || !post || !targetUser) {
        return res.status(404).json({ message: 'User, Post, or Target User not found' });
      }

      if (!targetUser.sharedPosts.includes(postId)) {
        targetUser.sharedPosts.push(postId);
      }

      await targetUser.save();

      res.json({ message: 'Post shared successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  else if(AccountType=="Business"){
    try {
      const user = await BusinessModel.findById(userId);
      const post = await Post.findById(postId);
      const targetUser = await BusinessModel.findById(targetUserId);

      if (!user || !post || !targetUser) {
        return res.status(404).json({ message: 'User, Post, or Target User not found' });
      }

      // if (!user.sharedPosts.includes(postId)) {
      //   user.sharedPosts.push(postId);
      // }

      if (!targetUser.sharedPosts.includes(postId)) {
        targetUser.sharedPosts.push(postId);
      }

      // await user.save();
      await targetUser.save();


      res.json({ message: 'Post shared successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  else if(AccountType=="Institute"){
    try {
      const user = await InstituteModel.findById(userId);
      const post = await Post.findById(postId);
      const targetUser = await InstituteModel.findById(targetUserId);

      if (!user || !post || !targetUser) {
        return res.status(404).json({ message: 'User, Post, or Target User not found' });
      }

      if (!targetUser.sharedPosts.includes(postId)) {
        targetUser.sharedPosts.push(postId);
      }

      await targetUser.save();

      res.json({ message: 'Post shared successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

