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
        {
            $lookup: {
                match: req.params.id,
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "authors"
            }
        }
    ])
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: 'Server error'+err });
    }
};

module.exports = { addComment, getComments };
