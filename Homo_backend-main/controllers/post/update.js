const express = require("express");
const Post = require("../../models/Post");
const deleteFile = require("../../services/handle-files/deleteFile");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
module.exports = async (req, res) => {
  const { files, body } = req;
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    let media = [];
    if (body.media) {
      let removedFiles = post.media.filter((media, i) => {
        let exist = !!body.media.includes(media);
        if (!exist) return false;
        media.push(media);
        return true;
      });
      removedFiles.forEach((image) => {
        deleteFile(image);
      });
    }
    if (files?.length) {
      files.forEach((file) => {
        media.push(`/upload/post/images/${file}`);
      });
    }

    if (media.length) {
      post.media = media;
    }
    // Merge req.body with the post object
    Object.assign(post, body);
    await post.save();

    res.json({
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(422).json({ message: "Failed to update post" });
  }
};
