const express = require("express");
const Conversation = require("../../models/Conversation");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
module.exports = async (req, res) => {
  const { id } = req.user;
  try {
    let conversations = await Conversation.find({
      members: { $in: [id] },
    })
      .populate({
        path: "members",
        select: {
          email: 1,
          firstname: 1,
          lastname: 1,
          displayname: 1,
          avatar: 1,
          phone: 1,
        },
      })
      .populate({
        path: "messages",
        select: "sender text createdAt",
        options: { sort: { createdAt: -1 }, limit: 1 },
        populate: {
          path: "sender",
          select: {
            email: 1,
            firstname: 1,
            lastname: 1,
            displayname: 1,
            avatar: 1,
            phone: 1,
          },
        },
      })
      .sort({ updatedAt: -1 });
    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json(err);
  }
};
