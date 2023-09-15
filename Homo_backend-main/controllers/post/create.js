const express = require("express");
const Post = require("../../models/Post");
const mongoose = require("mongoose");
// const uploadFiles = require("../../services/upload/uploadFiles");
// const deletefile = require("../../services/handle-files/deleteFile");

/**
 *
 * @param {express.request} req
 * @param {express.response } res
 */
module.exports = async (req, res) => {
  let { files } = req;
  // const id = req.user.id;

  const post = new Post({
    caption: req.body.caption,
    media: req.body.media,
    user: req.body.id,
  });
  if (files?.length) {
    post.media = files.map((file) => `/upload/post/images/${file.filename}`);
    //   await uploadFiles(files).then((response) => {
    //     response?.forEach((file) => {
    //       media.push(file.path);
    //       deletefile(file.path);
    //     });
    //   });
  }

  post
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        post: result,
        message: "Post created successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Failed to create Post",
        error: err.message,
      });
    });
};
