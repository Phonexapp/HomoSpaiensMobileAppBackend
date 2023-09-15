const express = require("express");
const Story = require("../../models/Story");

/**
 *
 * @param {express.request} req
 * @param {express.response} res
 */
module.exports = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    const { likes, dislikes } = req.body;

    if (likes === true && dislikes !== true) {
      if (!story.likes.includes(req.body.userId)) {
        await story.updateOne({ $push: { likes: req.body.userId }, $pull: { dislikes: req.body.userId } });
        res.status(200).json("The Story has been liked");
      } else {
        await story.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("The Story has been unliked");
      }
    } else if (dislikes === true && likes !== true) {
      if (!story.dislikes.includes(req.body.userId)) {
        await story.updateOne({ $push: { dislikes: req.body.userId }, $pull: { likes: req.body.userId } });
        res.status(200).json("The Story has been disliked ");
      } else {
        await story.updateOne({ $pull: { dislikes: req.body.userId } });
        res.status(200).json("The Story has been undisliked");
      }
    } else {
      res.status(400).json("Invalid request");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
   