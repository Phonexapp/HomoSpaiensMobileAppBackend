const express = require("express");
const router = express.Router();
const create = require("../controllers/messages/create")
const getbyconvid = require("../controllers/messages/getbyconvid")



router.post('/', create);
router.get('/conversation/:conversationId', getbyconvid)
router.delete('/:id', getbyconvid)



module.exports = router;