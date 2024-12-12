const Comment = require('../models/Comment');

// Add a comment to a thread
const addComment = async (req, res) => {
    try {
        const { threadId, content, mentions } = req.body;

        const comment = await Comment.create({
            thread: threadId,
            author: req.user,
            content,
            mentions,
        });

        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all comments for a thread
const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ thread: req.params.threadId })
            .populate('author', 'name')
            .populate('mentions', 'name');

        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { addComment, getComments };
