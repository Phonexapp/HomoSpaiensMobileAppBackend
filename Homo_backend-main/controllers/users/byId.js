const express = require("express");
const User = require("../../models/Users");

/**
 *
 * @param {express.request} req
 * @param {express.response } res
 */

module.exports = async (req, res) => {
  const { id } = req.params;
  try {
    let users = await User.findById(id)
    .populate('sharedReels');
    console.log(users);
    res.json({ users });
  } catch (e) {
    res.sendStatus(404).json({error: e.message, message : "No Users Found!"})
  }
};

// module.exports  = async (req, res) => {
//   const {  id } = req.params;

//   try {
//     const user = await User.findById(id)
//     .lean()
//     .populate('sharedReels');

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const sharedReels = user.sharedReels;

//     res.json({ sharedReels });
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

  