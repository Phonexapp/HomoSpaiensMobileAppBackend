const express = require("express");
const Post = require("../../models/Post");

/**
 *
 * @param {express.request} req
 * @param {express.response} res
 */
module.exports = async (req, res) => {
    const { post } = req.query
    let match = {}
    if(post) {
        match = { post }
    }
  try {
    let posts = await Post.find(match).lean();
    res.json({ posts });
  } catch (e) {
    res.status(404).json({error: e.message, message:"no posts found!"})
  }
};
