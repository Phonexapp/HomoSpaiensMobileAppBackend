const express = require("express")
const Comments = require("../../models/Comments")

/**
 * 
 * @param {express.request} req
 * @param {express.response} res
 * 
 */
module.exports = async (req, res) => {
    try {
        let UserComment = await Comments.find()
            .lean()
            .populate(
                [{ path: 'user', model: "users", select: "displayname" }]
            );

        let BusinessComment = await Comments.find()
            .lean()
            .populate(
                [{ path: 'user', model: "Business", select: "Displayname" }]
            );

        let InstituteComment = await Comments.find()
            .lean()
            .populate(
                [{ path: 'user', model: "Institute", select: "Displayname" }]
            );
        res.json({UserComment,BusinessComment,InstituteComment})
    } catch (e) {
        res.status(404).json({ error: e.message, message: "No Comments Found" })
    }
}

