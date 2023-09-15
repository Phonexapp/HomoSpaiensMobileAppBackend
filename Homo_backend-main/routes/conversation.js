const router = require("express").Router();
const Conversation = require("../models/Conversation");
const create = require("../controllers/conversation/create");
const get = require("../controllers/conversation/get");
const multer = require("multer");
const fs = require("fs");

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

//new conv
router.post("/", upload.single("avatar"), create);
router.get("/", get);

module.exports = router;
