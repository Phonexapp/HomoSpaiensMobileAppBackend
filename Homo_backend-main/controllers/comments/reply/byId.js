const express = require("express");
const ReplyComment = require("../../../models/ReplyComments");

/**
 *
 * @param {express.request} req
 * @param {express.response } res
 */

module.exports = async (req, res) => {
  const { id } = req.params;
  try {
    let replycomment = await ReplyComment.findById(id).populate([{path:'user',model:"users",select:"displayname"},{path:'user',model:"Business",select:"Displayname"},{path:'user',model:"Institute",select:"Displayname"}]);
    res.json({  replycomment });
  } catch (e) {
    res.sendStatus(404).json({error: e.message, message : "No Reply Comment Found!"})
  }
};

