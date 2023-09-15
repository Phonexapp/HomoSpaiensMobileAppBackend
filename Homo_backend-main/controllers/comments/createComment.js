const express = require("express");
const Comment = require("../../models/Comments");

/**
 *
 * @param {express.request} req
 * @param {express.response } res
 */

// Create a new comment
module.exports = async (req, res) => {
    try {
      const { post, user, content } = req.body;
  
      const comment = new Comment({
        post,
        user,
        content,
        createdAt: new Date(),
      });
  
      await comment.save();
      res.status(201).json(comment);
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'Failed to create the comment' });
    }
  };
