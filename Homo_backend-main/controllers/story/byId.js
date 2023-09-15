const express = require("express");
const Story = require("../../models/Story");
const mongoose = require("mongoose");

/**
 *
 * @param {express.request} req
 * @param {express.response } res
 */

module.exports = async (req, res) => {
  const { id } = req.params;
  try {
    let story = await Story.findById(id);
    console.log(story);
    res.json({ story });
  } catch (e) {
    res.sendStatus(404).json({error: e.message, message : "No story Found!"})
  }
};
