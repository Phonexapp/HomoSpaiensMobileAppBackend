const routers = require("express").Router();
const seceretkey = "seceretkey";
const bcrypt = require('bcrypt');
const saltRounds = 10;
const JWT=require("jsonwebtoken");
const BusinessModel = require("../models/BusinessAccountModel.js");

routers.post("/Businesslogin", async (req, res) => {
    const { UserEmail, UserPassword } = req.body;

    let UserData = await BusinessModel.findOne();
    console.log(UserData.Password);

    const userpassword = await  bcrypt.compare(UserPassword, UserData.Password);
    console.log(userpassword);
  
    let User = await BusinessModel.findOne({ Email: UserEmail });
    if (User && userpassword){
        const token=JWT.sign({UserID:UserData._id},seceretkey,{expiresIn:"1h"});
        res.status(200).json({token})
    }
    else  if (!(User && userpassword)){
        res.status(301).json({ Message: "User Not There" })
    }
})

module.exports = routers;