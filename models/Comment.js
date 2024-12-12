const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    thread: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    mentions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Tagged users
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', CommentSchema);
