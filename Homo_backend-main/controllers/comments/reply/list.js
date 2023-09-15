const express = require("express")
const Comments = require("../../../models/ReplyComments")

/**
 * 
 * @param {express.request} req
 * @param {express.response} res
 * 
 */
module.exports = async (req, res) => {
    try{
        let PersonalRplycomment = await Comments.find()
        .lean()
        .populate([{path:'user',model:"users",select:"displayname"}]);

        let BusinessReplycomment = await Comments.find()
        .lean()
        .populate([{path:'user',model:"Business",select:"Displayname"}]);


        let IntituteReplyComment = await Comments.find()
        .lean()
        .populate([{path:'user',model:"Institute",select:"Displayname"}]);
        res.json({PersonalRplycomment,BusinessReplycomment,IntituteReplyComment});

    } catch (e) {
        res.status(404).json({error: e.message,message: "No Comments Found"})
    }
}

