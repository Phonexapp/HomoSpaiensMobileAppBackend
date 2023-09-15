const express = require('express');
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const createReels = require('../controllers/reels/create');
const getAllreels = require('../controllers/reels/list');
const deleteReel = require('../controllers/reels/delete');
const byId = require('../controllers/reels/byId');
const storyController = require('../controllers/reels/toggleLike');
const shareReel = require('../controllers/reels/sharedReels');
const saveReel = require('../controllers/reels/saveReels');
// const {deleteExpiredStories} = require('../controllers/story/ExpiresIn24hrs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let pathName = "public/uploads/reels/images";
      if (file.mimetype.startsWith("video")) {
        pathName = "public/uploads/reels/videos";
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
router.post('/',upload.array("image"),createReels);

// list products
router.get('/',getAllreels);
// like/dislike/amazing/outstanding
router.put('/:id', storyController.interaction);
// share Reels
router.post('/share', shareReel);
// save / unsave reels
router.post('/save', saveReel);






// delete reel
router.delete("/:id", deleteReel);

// Single reel
router.get("/:id", byId);

//update Product
// router.put("/:id", upload.array("media"), updatePost);



module.exports = router;
