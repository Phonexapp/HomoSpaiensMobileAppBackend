const routers=require("express").Router();
const AmazingTopic=require("../Amazing Topic/UserAmazingTopic.js");

routers.post("/Topic",AmazingTopic);

module.exports=routers;