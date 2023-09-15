const User = require("../../models/Users.js");
const BusinessModel = require("../../models/BusinessAccountModel.js");
const InstituteModel = require("../../models/InstituteAccountModel.js");
const Report = require("../../models/ReportUsers.js");

module.exports = async (req, res) => {
  const { AccountType, userId, reportedUserId, reason, details } = req.body;
  if (AccountType == "Personal") {
    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      let Data = new Report({
        reportedUserId: reportedUserId,
        reason: reason,
        details: details,
      })

      let DataSave=await Data.save();
      console.log(DataSave);

      const report = {
        reportedUserId,
        reason,
        details,
      };

      user.reports.push(report);
      await user.save();

      res.json({ message: 'User reported successfully' });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  else if (AccountType == "Business") {
    try {
      const user = await BusinessModel.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      let Data = new Report({
        reportedUserId: reportedUserId,
        reason: reason,
        details: details,
      })

      let DataSave=await Data.save();
      console.log(DataSave);

      const report = {
        reportedUserId,
        reason,
        details,
      };

      user.reports.push(report);
      await user.save();

      res.json({ message: 'User reported successfully' });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  else if (AccountType == "Institute") {
    try {
      const user = await InstituteModel.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      let Data = new Report.reports({
        reportedUserId: reportedUserId,
        reason: reason,
        details: details,
      })

      let DataSave=await Data.save();
      console.log(DataSave);

      const report = {
        reportedUserId,
        reason,
        details,
      };

      user.reports.push(report);
      await user.save();

      res.json({ message: 'User reported successfully' });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

