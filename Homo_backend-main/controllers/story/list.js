const Story = require("../../models/Story");

// Get all stories
module.exports = async (req, res) => {
  try {
    const Personalstories = await Story.find({ expiresAt: { $gte: new Date() } })
      .populate({path :"user",model: "users",select: "displayname"})
      .lean();

    const Businessstories = await Story.find({ expiresAt: { $gte: new Date() } })
    .populate({path :"user",model: "Business",select: "Displayname"})
    .lean();

  const Intitutestories = await Story.find({ expiresAt: { $gte: new Date() } })
  .populate({path :"user",model: "Institute",select: "Displayname"})
  .lean();

res.json({Personalstories,Businessstories,Intitutestories});

  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve stories" });
  }
};
