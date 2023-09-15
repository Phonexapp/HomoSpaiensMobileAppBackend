const express = require("express");
const router = express.Router();
const createComment = require("../controllers/comments/createComment")
const list = require("../controllers/comments/list")
const byid = require("../controllers/comments/byId")
const deleteComments = require("../controllers/comments/delete")
const toggleLike = require("../controllers/comments/toggleLike")
const replyComment = require("../controllers/comments/reply/replyComment")
const replylist = require("../controllers/comments/reply/list")
const replybyid = require("../controllers/comments/reply/byId")
const deleteReplyComments = require("../controllers/comments/reply/delete")
const toggleReplyLike = require("../controllers/comments/reply/toggleLike")


router.post('/', createComment);
//comments list
router.get('/', list)
// reply comments list
router.get('/reply', replylist)
// reply comments by id
router.get('/UserReply/:id', byid)
// delete comments
router.delete('/:id', deleteComments)
// toggle like comments
router.put("/like/:id", toggleLike)
//toggle like reply comments
router.put("/reply/like/:id", toggleReplyLike)


router.post('/reply', replyComment);
//Need to check
router.get('/reply/:id', replybyid)
router.delete('/reply/:id', deleteReplyComments)
// like / dislike comments



module.exports = router;