const express = require("express");
const ReplyComment = require("../../../models/ReplyComments");
const mongoose = require("mongoose");

/**
 *
 * @param {express.request} req
 * @param {express.response } res
 */
module.exports = async (req, res) => {
  try {
    let replycomment = await ReplyComment.findById(req.params.id);

    if (!replycomment) {
      return res.status(404).json({ message: "Reply Comments Not Found" });
    }
    replycomment.toggleStatus();
    let updated = await replycomment.save();
    res.status(201).json({
      message: `Reply Comment ${
        updated.status === "inactive" ? "Deactivated" : "Activated"
      } Successfully`,
      replycomment: updated,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "Server error"});
  }
};
