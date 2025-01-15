const Comment = require('../models/Comment');

// Add a comment to a thread
const addComment = async (req, res) => {
    try {
        const threadId = req.params.threadId;
        const userId = req.params.userId;
        const { commentaire } = req.body;
        console.log("Commentaire: "+commentaire);

        const comment = await Comment.create({
            thread: threadId,
            author: userId,
            content: commentaire
        });
        await comment.save();
        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ message: 'Server error:'+err });
    }
};

// Get all comments for a thread
const getComments = async (req, res) => {
    try {
        const comments = await Comment.aggregate([
            { $match: {thread: req.params.threadId}},
            { $lookup: { from: 'users', localField: 'author', foreignField: '_id', as: 'user' } }
    ])
        res.json(comments);
        console.log("Request:" + req.params.threadId + "Response:" +res);
    } catch (err) {
        res.status(500).json({ message: 'Server error'+err + "Request:" + req + "Response:" + res});
    }
};

module.exports = { addComment, getComments };
