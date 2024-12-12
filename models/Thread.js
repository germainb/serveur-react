const mongoose = require('mongoose');

const ThreadSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isPrivate: { type: Boolean, default: false },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // Ensure this is defined
    createdAt: { type: Date, default: Date.now },
  });
  
  const Thread = mongoose.model("Thread", ThreadSchema);

  module.exports = Thread;

  