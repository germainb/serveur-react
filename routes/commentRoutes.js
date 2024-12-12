const express = require('express');
const { addComment, getComments } = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:threadId', getComments);
router.post('/', authMiddleware, addComment);

module.exports = router;
