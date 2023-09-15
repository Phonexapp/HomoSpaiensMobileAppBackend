const express = require("express");
const Comment = require("../../../models/ReplyComments");

/**
 *
 * @param {express.request} req
 * @param {express.response } res
 */

// Create a new comment
module.exports = async (req, res) => {
    try {
      const { post, user, content,commentId } = req.body;
  
      const replycomment = new Comment({
        user,
        commentId,
        content,
      });
  
      await replycomment.save();
      res.status(201).json(replycomment);
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'Failed to reply the comment' });
    }
  };
