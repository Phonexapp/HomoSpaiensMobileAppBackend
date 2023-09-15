var express = require('express');
var router = express.Router();
const userController = require("../controllers/users/blockUser")
const list = require("../controllers/users/list")
const follow = require("../controllers/users/follow-unfollow")
const block = require("../controllers/users/block-Unblock")
const reportUesrs = require("../controllers/users/reportUsers")
const reportedUesrslist = require("../controllers/users/reportedUsers/list")
const getbyId = require("../controllers/users/byId")

/* GET users listing. */
router.get('/', list);

router.get('/:id', getbyId);

  
router.put('/:id', userController.updateUserStatus);
//follow / unfollow
router.post('/follow', follow);
//block / unblock
router.post('/block', block);

router.post('/report', reportUesrs);
router.get('/reports', reportedUesrslist);

module.exports = router;
