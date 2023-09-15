const routers=require("express").Router();
const multer = require("multer");
const fs = require("fs");
const UserVideo=require("../Video/UserVideo.js");
const ShareVideo=require("../Video/sharevideo.js");
const SaveVideo=require("../Video/savevideo.js");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let pathName = "public/videos";
      fs.mkdirSync(pathName, { recursive: true });
      cb(null, pathName);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${file.fieldname}-${uniqueSuffix}${file.originalname}`);
    },
  });

  const upload = multer({ storage: storage });

routers.post("/uservideo", upload.single("video"),UserVideo);
routers.post("/share",ShareVideo);
routers.post("/save",SaveVideo);

module.exports=routers;