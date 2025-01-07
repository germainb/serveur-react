const express = require('express');
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

router.get('/', getThreads);
router.get('/:id', authMiddleware, getThreadById);
router.post('/', authMiddleware, createThread);
router.put('/:id', authMiddleware, updateThread);
router.delete('/:id', authMiddleware, deleteThread);

// Like a thread
router.post('/:id/like', authMiddleware, likeThread);

// Dislike a thread
router.post('/:id/dislike', authMiddleware, dislikeThread);



// make a thread private
router.put('/:threadId/private', authMiddleware, toggleThreadPrivacy);

module.exports = router;
