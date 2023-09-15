const express = require("express");
const Post = require("../../models/Post");
const mongoose = require("mongoose");

/**
 *
 * @param {express.request} req
 * @param {express.response } res
 */

module.exports = async (req, res) => {
  const { id } = req.params;
  try {
    let post = await Post.findById(id);
    console.log(post);
    res.json({ post });
  } catch (e) {
    res.sendStatus(404).json({error: e.message, message : "No Posts Found!"})
  }
};
