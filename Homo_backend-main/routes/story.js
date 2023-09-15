const express = require('express');
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const createStory = require('../controllers/story/create');
const getAllStories = require('../controllers/story/list');
const deleteStory = require('../controllers/story/delete');
const byId = require('../controllers/story/byId');
const toggleLike = require('../controllers/story/toggleLike');

const {deleteExpiredStories} = require('../controllers/story/ExpiresIn24hrs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let pathName = "public/uploads/story/images";
      if (file.mimetype.startsWith("video")) {
        pathName = "public/uploads/story/videos";
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

// Create a new story
router.post('/',upload.array("image"), deleteExpiredStories,createStory);
router.get('/', deleteExpiredStories,getAllStories);
// delete reel
router.delete("/:id", deleteStory);
// like/dislike
router.put("/like", toggleLike)

// Single reel
router.get("/:id", byId);

module.exports = router;
