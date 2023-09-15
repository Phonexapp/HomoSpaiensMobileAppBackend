const express = require("express");
const Post = require("../../models/Post");
const mongoose = require("mongoose");

/**
 *
 * @param {express.request} req
 * @param {express.response } res
 */

module.exports = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post Not Found" });
    }
    post.toggleStatus();
    let updated = await post.save();
    res
      .status(201)
      .json({
        message: `Post ${
          updated.status === "inactive" ? "Deactive" : "Activated"
        } successfully`,
        post: updated,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
