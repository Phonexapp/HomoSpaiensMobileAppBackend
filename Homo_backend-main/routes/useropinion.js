const routers=require("express").Router();
const UserOpinion=require("../UserOpinion/UserOpinionData.js");

routers.post("/UserOpinion",UserOpinion);

module.exports=routers;