const express = require("express");
const Post = require("../../models/Post");

/**
 *
 * @param {express.request} req
 * @param {express.response} res
 */

// only for like / unlike a post  not for dislike
  //   module.exports = async (req, res) => {
  //   try {
  //     const post = await Post.findById(req.params.id);
  //     if (!post.likes.includes(req.body.userId)) {
  //       await post.updateOne({ $push: { likes: req.body.userId } });
  //       res.status(200).json("The post has been liked");
  //     } else {
  //       await post.updateOne({ $pull: { likes: req.body.userId } });
  //       res.status(200).json("The post has been disliked");
  //     }
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // };

  const interaction = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const userId = req.body.userId;
      const { likes, amazing, outstanding, dislikes } = req.body;
  
      if (likes === true) {
        await post.updateOne({ $pull: { amazing: userId, outstanding: userId, dislikes: userId } });
  
        if (!post.likes.includes(userId)) {
          await post.updateOne({ $push: { likes: userId } });
          res.status(200).json("The Post has been liked");
        } else {
          await post.updateOne({ $pull: { likes: userId } });
          res.status(200).json("The Post has been disliked");
        }
      } else if (amazing === true) {
        await post.updateOne({ $pull: { likes: userId, outstanding: userId, dislikes: userId } });
  
        if (!post.amazing.includes(userId)) {
          await post.updateOne({ $push: { amazing: userId } });
          res.status(200).json("The Post is amazing");
        } else {
          await post.updateOne({ $pull: { amazing: userId } });
          res.status(200).json("The Post is no longer amazing");
        }
      } else if (outstanding === true) {
        await post.updateOne({ $pull: { likes: userId, amazing: userId, dislikes: userId } });
  
        if (!post.outstanding.includes(userId)) {
          await post.updateOne({ $push: { outstanding: userId } });
          res.status(200).json("The Post is outstanding");
        } else {
          await post.updateOne({ $pull: { outstanding: userId } });
          res.status(200).json("The Post is no longer outstanding");
        }
      } else if (dislikes === true) {
        await post.updateOne({ $pull: { likes: userId, amazing: userId, outstanding: userId } });
  
        if (!post.dislikes.includes(userId)) {
          await post.updateOne({ $push: { dislikes: userId } });
          res.status(200).json("The Post has been disliked");
        } else {
          await post.updateOne({ $pull: { dislikes: userId } });
          res.status(200).json("The Post is no longer disliked");
        }
      } else {
        res.status(400).json("Invalid request");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  module.exports = {
    interaction
  };
   