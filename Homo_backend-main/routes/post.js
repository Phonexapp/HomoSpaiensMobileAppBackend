const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
// const singleProduct = require("../controllers/product/getbyid");
const updatePost = require("../controllers/post/update");
const createPost = require("../controllers/post/create");
const deletePost = require("../controllers/post/delete");
const listPost = require("../controllers/post/list");
const fs = require("fs");
const myPost = require("../controllers/post/mypost");
const storyController = require("../controllers/post/toggleLike");
const byId = require("../controllers/post/byId");
const sharePosts = require("../controllers/post/sharedPost");
const savePost = require("../controllers/post/savePost");
const toggleArchivePost = require("../controllers/post/archievePost");
// const authenticateUser = require("../controllers/auth/login");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let pathName = "public/uploads/post/images";
    if (file.mimetype.startsWith("video")) {
      pathName = "public/uploads/post/videos";
    }
    fs.mkdirSync(pathName, { recursive: true });
    cb(null, pathName);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// create product
router.post("/", upload.array("media"), createPost);

// list products
router.get("/", listPost);
router.get("/my-posts", myPost);
// router.put('/:id', storyController.interaction);

//delete product
router.delete("/:id", deletePost);

// Single product
router.get("/:id", byId);

//update Product
// router.put("/:id", upload.array("media"), updatePost);

// share Post
router.post('/share', sharePosts);

router.post('/save', savePost);

// router.put('/:id', authenticateUser, toggleArchivePost);
module.exports = router;
