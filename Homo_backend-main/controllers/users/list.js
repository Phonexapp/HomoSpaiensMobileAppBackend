const Users = require("../../models/Users");

// Get all stories
module.exports = async (req, res) => {
  try {
    const users = await Users.find()
    //   .populate({path :"user",select: "displayname"})
      .lean();
    res.json({ users});
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};
