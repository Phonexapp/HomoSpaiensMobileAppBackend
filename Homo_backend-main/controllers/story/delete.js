const express = require("express");
const Story = require("../../models/Story");
const mongoose = require("mongoose");

/**
 *
 * @param {express.request} req
 * @param {express.response } res
 */

module.exports = async (req, res) => {
  console.log(req);
  try {
    let story = await Story.findById(req.params.id);
    let StoryDelete = await story.deleteOne();
    console.log(StoryDelete);
    res.status(200).json({Message:"Story Deleted"});

    // if (!story) {
    //   return res.status(404).json({ message: "Story Not Found" });
    // }
    // story.toggleStatus();
    // let updated = await story.save();
    // res
    //   .status(201)
    //   .json({
    //     message: `Story ${
    //       updated.status === "inactive" ? "Deactive" : "Activated"
    //     } successfully`,
    //     story: updated,
    //   });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
