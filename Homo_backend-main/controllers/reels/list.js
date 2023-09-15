const express = require("express");
const Reels = require("../../models/Reels");

/**
 *
 * @param {express.request} req
 * @param {express.response} res
 */
module.exports = async (req, res) => {
    const { reel } = req.query
    let match = {}
    if(reel) {
        match = { reel }
    }
  try {
    let reels = await Reels.find(match).lean();
    res.json({ reels });
  } catch (e) {
    res.status(404).json({error: e.message, message:"no reels found!"})
  }
};
