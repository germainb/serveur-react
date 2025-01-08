const express = require('express');
var cors = require('cors');
const {
    getThreads,
    getThreadById,
    createThread,
    updateThread,
    deleteThread,
    likeThread,
    dislikeThread,
    getUserThreads,
    toggleThreadPrivacy,
} = require('../controllers/threadController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(cors());
router.get('/', getThreads);
router.get('/:id', getThreadById);
router.post('/', createThread);
router.put('/:id', updateThread);
router.delete('/:id', deleteThread);

// Like a thread
router.post('/:id/like', likeThread);

// Dislike a thread
router.post('/:id/dislike', dislikeThread);



// make a thread private
router.put('/:threadId/private', toggleThreadPrivacy);

module.exports = router;
