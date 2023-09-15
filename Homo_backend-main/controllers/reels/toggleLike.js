const express = require("express");
const Reels = require("../../models/Reels");

/**
 *
 * @param {express.request} req
 * @param {express.response} res
 */
  const interaction = async (req, res) => {
    try {
      const reels = await Reels.findById(req.params.id);
      const userId = req.body.userId;
      const { likes, amazing, outstanding, dislikes } = req.body;
  
      if (likes === true) {
        await reels.updateOne({ $pull: { amazing: userId, outstanding: userId, dislikes: userId } });
  
        if (!reels.likes.includes(userId)) {
          await reels.updateOne({ $push: { likes: userId } });
          res.status(200).json("The Reel has been liked");
        } else {
          await reels.updateOne({ $pull: { likes: userId } });
          res.status(200).json("The Reel has been disliked");
        }
      } else if (amazing === true) {
        await reels.updateOne({ $pull: { likes: userId, outstanding: userId, dislikes: userId } });
  
        if (!reels.amazing.includes(userId)) {
          await reels.updateOne({ $push: { amazing: userId } });
          res.status(200).json("The Reel is amazing");
        } else {
          await reels.updateOne({ $pull: { amazing: userId } });
          res.status(200).json("The Reel is no longer amazing");
        }
      } else if (outstanding === true) {
        await reels.updateOne({ $pull: { likes: userId, amazing: userId, dislikes: userId } });
  
        if (!reels.outstanding.includes(userId)) {
          await reels.updateOne({ $push: { outstanding: userId } });
          res.status(200).json("The Reel is outstanding");
        } else {
          await reels.updateOne({ $pull: { outstanding: userId } });
          res.status(200).json("The Reel is no longer outstanding");
        }
      } else if (dislikes === true) {
        await reels.updateOne({ $pull: { likes: userId, amazing: userId, outstanding: userId } });
  
        if (!reels.dislikes.includes(userId)) {
          await reels.updateOne({ $push: { dislikes: userId } });
          res.status(200).json("The Reel has been disliked");
        } else {
          await reels.updateOne({ $pull: { dislikes: userId } });
          res.status(200).json("The Reel is no longer disliked");
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
   