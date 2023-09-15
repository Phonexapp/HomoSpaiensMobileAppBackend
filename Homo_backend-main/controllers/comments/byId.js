const express = require("express");
const Comment = require("../../models/Comments");

/**
 *
 * @param {express.request} req
 * @param {express.response } res
 */

module.exports = async (req, res) => {
  const { id } = req.params;
  try {
    let Personalcomment = await Comment.findById(id).populate({ path: 'user', model: "users", select: "displayname" });

    let Businesscomment = await Comment.findById(id).populate({ path: 'user', model: "Business", select: "Displayname" });

    let Institutecomment = await Comment.findById(id).populate({ path: 'user', model: "Institute", select: "Displayname" });

    res.json({ Personalcomment, Businesscomment, Institutecomment });
  } catch (e) {
    res.sendStatus(404).json({ error: e.message, message: "No Comment Found!" })
  }
};

