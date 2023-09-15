const express = require("express");
const Conversation = require("../../models/Conversation");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
module.exports = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id).populate({
      path: "members",
      select: {
        email: 1,
        firstname: 1,
        lastname: 1,
        displayname: 1,
        avatar: 1,
        phone: 1,
      },
    });
    res.json(conversation);
  } catch (err) {
    res.status(404).json({
      message: "Conversation not found",
      error: err.message,
    });
  }
};
