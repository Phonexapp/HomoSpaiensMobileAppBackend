const routers=require("express").Router();
const VideoLike=require("../VideoLike/videolike.js");

routers.post("/userlike",VideoLike);

module.exports=routers;