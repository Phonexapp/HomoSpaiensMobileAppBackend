const routers=require("express").Router();
const JWT=require("jsonwebtoken");
const seceretkey = "seceretkey";

function GetToken(req,res,next){
    const Bearer=req.headers["authorization"];
    if(typeof Bearer!=="undefined"){
        const BearerData=Bearer.split(" ");
        const token=BearerData[1];
        req.token=token
    }
    else{
        res.status(300).json({Message:"Inavlid Token"});
    }
}

routers.post("/BusinessLoginHome",GetToken,(req,res)=>{
    const ID=req.body.ID
    JWT.verify(req.token,seceretkey,(Err,Data)=>{
        if(Err){
            res.status(300).send(Err);
        }
        else{
            if(ID==Data.UserID){
                res.status(200).send({Message:"true"});
            }
        }
    })
})

module.exports = routers;
