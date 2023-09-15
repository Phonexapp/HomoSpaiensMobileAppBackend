const ReportUsers = require("../../../models/ReportUsers");

// Get all stories
module.exports = async (req, res) => {
    const reports = await ReportUsers.find({})
      console.log(reports);
};
