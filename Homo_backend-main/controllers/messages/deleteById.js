const express = require("express");
const Message = require("../../models/Message");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
module.exports = function (req, res) {
  try {
    const { id } = req.params;
    Message.findByIdAndUpdate(id, { $set: { status: "deleted" } });
  } catch (err) {}
};
