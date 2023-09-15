const express = require("express");
const ReplyComment = require("../../../models/ReplyComments");

/**
 *
 * @param {express.request} req
 * @param {express.response} res
 */

//like / dislike a post
module.exports = async (req, res) => {
  try {
    const comment = await ReplyComment.findById(req.params.id);
    const { likes, dislikes } = req.body;

    if (likes === true && dislikes !== true) {
      if (!comment.likes.includes(req.body.userId)) {
        await comment.updateOne({ $push: { likes: req.body.userId }, $pull: { dislikes: req.body.userId } });
        res.status(200).json("The Comment has been liked");
      } else {
        await comment.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("The Comment has been unliked");
      }
    } else if (dislikes === true && likes !== true) {
      if (!comment.dislikes.includes(req.body.userId)) {
        await comment.updateOne({ $push: { dislikes: req.body.userId }, $pull: { likes: req.body.userId } });
        res.status(200).json("The Comment has been disliked ");
      } else {
        await comment.updateOne({ $pull: { dislikes: req.body.userId } });
        res.status(200).json("The Comment has been undisliked");
      }
    } else {
      res.status(400).json("Invalid request");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};