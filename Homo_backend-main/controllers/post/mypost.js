const express = require("express");
const Post = require("../../models/Post");

/**
 *
 * @param {express.request} req
 * @param {express.response} res
 */
module.exports = async (req , res) => {
    let user = req.body.id;
    let match = {};
    if(user) {
        match.user = user;
    }
    try{
        let posts = await Post.find(match).lean();
        // let Personalposts = await Post.find(match).populate({path:"user",model:"users"});
        // let Businessposts = await Post.find(match).populate({path:"user",model:"Business"});
        // let Instituteposts = await Post.find(match).populate({path:"user",model:"Institute"});
        // res.json({Personalposts,Businessposts,Instituteposts})
        res.json({posts})

    } catch (e) {
        res.status(404).json({error: e.message,message: "No Posts Found"});
    }
};