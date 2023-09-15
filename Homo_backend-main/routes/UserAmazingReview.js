const routers=require("express").Router();
const multer = require("multer");
const fs = require("fs");
const AmazingReview=require("../Amazing Review/UserAmazingReview.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype == "video/mp4") {
      let pathName = "public/videos";
      fs.mkdirSync(pathName, { recursive: true });
      cb(null, pathName);
    }
    else if (file.mimetype == "image/jpeg") {
      let pathName = "public/Image";
      fs.mkdirSync(pathName, { recursive: true });
      cb(null, pathName);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

routers.post("/Review", upload.any("Anything"),AmazingReview);

module.exports=routers;