const express = require('express');
var cors = require('cors');
const { addComment, getComments } = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(cors())
router.get('/:threadId', getComments);
router.post('/:threadId/:userId', authMiddleware, addComment);

module.exports = router;
