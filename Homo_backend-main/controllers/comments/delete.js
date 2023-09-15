const express = require("express");
const Comment = require("../../models/Comments");
const mongoose = require("mongoose");

/**
 *
 * @param {express.request} req
 * @param {express.response } res
 */
module.exports = async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comments Not Found" });
    }
    comment.toggleStatus();
    let updated = await comment.save();
    res.status(201).json({
      message: `Comment ${
        updated.status === "inactive" ? "Deactivated" : "Activated"
      } Successfully`,
      comment: updated,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "Server error"});
  }
};
