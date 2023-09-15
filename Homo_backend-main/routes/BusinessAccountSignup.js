const routers = require("express").Router();
const bcrypt = require('bcrypt');
const multer = require("multer");
const fs = require("fs");
const saltRounds = 10;
const BusinessModel = require("../models/BusinessAccountModel.js");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let pathName = "public/uploads/avatar";
      fs.mkdirSync(pathName, { recursive: true });
      cb(null, pathName);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${file.fieldname}-${uniqueSuffix}${file.originalname}`);
    },
  });
  
  const upload = multer({ storage: storage });

routers.post("/Businesssignup", upload.single("avatar"), async (req, res) => {
    const { compnayname,
        Businesstype,
        Displayname,
        FoundedDate,
        UserEmail,
        Country,
        City,
        Password,
        Repassword,
    } = req.body

    const PlainHashedPassword = await bcrypt.hash(Password, saltRounds);
    const RepasswordHashedPassword = await bcrypt.hash(Repassword, saltRounds)

    console.log(PlainHashedPassword);
    console.log(RepasswordHashedPassword);


    // let User = BusinessModel.findOne({ Email: UserEmail })
    let BusinessData =  new BusinessModel({
        Companyname: compnayname,
        Businesstype: Businesstype,
        Displayname: Displayname,
        Foundeddate: FoundedDate,
        Email: UserEmail,
        Country: Country,
        City: City,
        avatar:`${req.file.filename}`,
        Password: PlainHashedPassword,
        Repassword: RepasswordHashedPassword
    })

    let DataSave = await BusinessData.save();
    console.log(DataSave);
})

module.exports = routers;