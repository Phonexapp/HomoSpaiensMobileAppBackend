const express = require("express");
const Reel = require("../../models/Reels");
const mongoose = require("mongoose");

/**
 *
 * @param {express.request} req
 * @param {express.response } res
 */

module.exports = async (req, res) => {
  const { id } = req.params;
  try {
    let reel = await Reel.findById(id);
    console.log(reel);
    res.json({ reel });
  } catch (e) {
    res.sendStatus(404).json({error: e.message, message : "No Reel Found!"})
  }
};
