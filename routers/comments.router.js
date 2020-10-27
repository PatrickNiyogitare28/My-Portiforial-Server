const express = require('express');
const router = express.Router();
const {sendComment,readComments} = require('../controllers/comments.controller');
const isAdmin = require('../middlewares/admin');
const authMiddleware = require('../middlewares/auth');

router.post('/sendComment/blogId',[authMiddleware], sendComment);
router.get('/readComments',[isAdmin],readComments);

module.exports = router;
