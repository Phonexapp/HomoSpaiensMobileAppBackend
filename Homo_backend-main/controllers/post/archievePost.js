// Import dependencies
const Post = require('../../models/Post');

// Archive or unarchive a post
module.exports = (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id; // Assuming user ID is available in the request after authentication
  const { archive } = req.body;

  // Check if the post belongs to the authenticated user
  Post.findOneAndUpdate(
    { _id: postId, userId: userId },
    { archived: archive },
    { new: true },
    (err, post) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error' });
      } else if (!post) {
        res.status(404).json({ error: 'Post not found' });
      } else {
        res.json(post);
      }
    }
  );
};
