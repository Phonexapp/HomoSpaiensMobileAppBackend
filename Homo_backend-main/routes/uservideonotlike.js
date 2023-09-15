const routers=require("express").Router();
const VideonotLike=require("../VideoDislike/videonotlike.js");

routers.post("/Dislike",VideonotLike);

module.exports=routers;