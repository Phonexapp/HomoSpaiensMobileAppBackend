
const User = require('../../models/Users');
const BusinessModel = require('../../models/BusinessAccountModel.js');
const InstituteModel = require('../../models/InstituteAccountModel.js');


module.exports = async (req, res) => {
  const {AccountType, userId,  postId, action } = req.body;
  if(AccountType=="Personal"){
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (action === 'save') {
        if (user.savedPosts.includes(postId)) {
          return res.status(400).json({ message: 'Post is already saved' });
        }
  
        user.savedPosts.push(postId);
        await user.save();
  
        res.json({ message: 'Post saved successfully' });
      } else if (action === 'unsave') {
        if (!user.savedPosts.includes(postId)) {
          return res.status(400).json({ message: 'Post is not saved' });
        }
  
        user.savedPosts.pull(postId);
        await user.save();
  
        res.json({ message: 'Post unsaved successfully' });
      } else {
        return res.status(400).json({ message: 'Invalid action' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  else if(AccountType=="Business"){
    try {
      const user = await BusinessModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (action === 'save') {
        if (user.savedPosts.includes(postId)) {
          return res.status(400).json({ message: 'Post is already saved' });
        }
  
        user.savedPosts.push(postId);
        await user.save();
  
        res.json({ message: 'Post saved successfully' });
      } else if (action === 'unsave') {
        if (!user.savedPosts.includes(postId)) {
          return res.status(400).json({ message: 'Post is not saved' });
        }
  
        user.savedPosts.pull(postId);
        await user.save();
  
        res.json({ message: 'Post unsaved successfully' });
      } else {
        return res.status(400).json({ message: 'Invalid action' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  else if(AccountType=="Institute"){
    try {
      const user = await InstituteModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (action === 'save') {
        if (user.savedPosts.includes(postId)) {
          return res.status(400).json({ message: 'Post is already saved' });
        }
  
        user.savedPosts.push(postId);
        await user.save();
  
        res.json({ message: 'Post saved successfully' });
      } else if (action === 'unsave') {
        if (!user.savedPosts.includes(postId)) {
          return res.status(400).json({ message: 'Post is not saved' });
        }
  
        user.savedPosts.pull(postId);
        await user.save();
  
        res.json({ message: 'Post unsaved successfully' });
      } else {
        return res.status(400).json({ message: 'Invalid action' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

