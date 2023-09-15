const express = require("express");
const Reels = require("../../models/Reels");
const mongoose = require("mongoose");

/**
 *
 * @param {express.request} req
 * @param {express.response } res
 */

module.exports = async (req, res) => {
  try {
    let reel = await Reels.findById(req.params.id);

    if (!reel) {
      return res.status(404).json({ message: "Reels Not Found" });
    }
    reel.toggleStatus();
    let updated = await reel.save();
    res
      .status(201)
      .json({
        message: `Reels ${
          updated.status === "inactive" ? "Deactive" : "Activated"
        } successfully`,
        reel: updated,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
