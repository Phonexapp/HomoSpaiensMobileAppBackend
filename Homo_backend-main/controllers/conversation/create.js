const express = require("express");
const Conversation = require("../../models/Conversation");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
module.exports = async (req, res) => {
  const { members } = req.body;
  const { id } = req.user;
  const { file } = req;
  try {
    const newConversation = new Conversation({
      type: "group",
      members,
    });
    if (file) {
      newConversation.avatar = `/uploads/avatar/${file.filename}`;
    }
    if (newConversation.type === "group") {
      newConversation.admins.push(id);
    }
    await newConversation.save();
    res.status(200).json(newConversation);
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message, message: "Failed to create conversation" });
  }
};
