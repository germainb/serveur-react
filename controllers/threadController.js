const Thread = require("../models/Thread");

// Get all public threads
const getThreads = async (req, res) => {
  try {
    const threads = await Thread.find({ isPrivate: false })
      .populate("author", "name avatar")
      .sort({ createdAt: -1 });
    res.json(threads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a thread by ID
const getThreadById = async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id)
      .populate("author", "name")
      .populate({
        path: "comments",
        populate: { path: "author", select: "name" },
      });

    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    if (thread.isPrivate && thread.author.toString() !== req.user) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(thread);
  } catch (err) {
    console.error("Error fetching thread:", err); // Logs detailed error
    res.status(500).json({ message: "Server error" });
  }
};

// Controller for creating a new thread
const createThread = async (req, res) => {

  const { title, content, tags, isPrivate } = req.body;

  try {
    const newThread = new Thread({
      title,
      content,
      tags: tags || [], // Ensure tags are passed in the request
      isPrivate: isPrivate || false,
      author: req.user, // Attach the author (user) ID from the authenticated user
      likes: [], // Initially, no likes
      dislikes: [], // Initially, no dislikes
    });

    await newThread.save();

    res.status(201).json({
      message: "Thread created successfully",
      thread: newThread,
    });
  } catch (error) {
    console.error("Error creating thread:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a thread
const updateThread = async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id);

    if (!thread) return res.status(404).json({ message: "Thread not found" });

    if (thread.author.toString() !== req.user) {
      return res.status(403).json({ message: "Access denied" });
    }

    const { title, content, isPrivate, tags } = req.body;

    thread.title = title || thread.title;
    thread.content = content || thread.content;
    thread.isPrivate = isPrivate ?? thread.isPrivate;
    thread.tags = tags || thread.tags;

    await thread.save();

    res.json(thread);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a thread
const deleteThread = async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id);

    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    // Ensure the logged-in user is the author of the thread
    if (thread.author.toString() !== req.user) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Use findByIdAndDelete for consistency
    await Thread.findByIdAndDelete(req.params.id);
    res.json({ message: "Thread removed successfully" });
  } catch (err) {
    console.error("Error deleting thread:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// Like a thread
const likeThread = async (req, res) => {
  const { id } = req.params;
  const userId = req.user; // User ID from authMiddleware

  try {
    const thread = await Thread.findById(id).populate("author", "name avatar");

    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    // Check if the user already liked the thread
    if (thread.likes.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already liked this thread" });
    }

    // Remove from dislikes if exists
    thread.dislikes = thread.dislikes.filter(
      (user) => user.toString() !== userId
    );

    // Add user to likes array
    thread.likes.push(userId);

    await thread.save();

    res.status(200).json({ message: "Thread liked", thread });
  } catch (error) {
    console.error("Error liking thread:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Dislike a thread
const dislikeThread = async (req, res) => {
  const { id } = req.params;
  const userId = req.user; // User ID from authMiddleware

  try {
    const thread = await Thread.findById(id).populate("author", "name avatar");

    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    // Check if the user already disliked the thread
    if (thread.dislikes.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already disliked this thread" });
    }

    // Remove from likes if exists
    thread.likes = thread.likes.filter((user) => user.toString() !== userId);

    // Add user to dislikes array
    thread.dislikes.push(userId);

    await thread.save();

    res.status(200).json({ message: "Thread disliked", thread });
  } catch (error) {
    console.error("Error disliking thread:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get User Activity Board (threads created by the user)
const getUserThreads = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the logged-in user is requesting their own activity
    if (req.user !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const threads = await Thread.find({ author: userId }).select(
      "title content tags isPrivate createdAt"
    );

    res.json(threads);
  } catch (err) {
    console.error(err.message || err);
    res.status(500).json({ message: "Server error" });
  }
};

// Toggle Thread Privacy
const toggleThreadPrivacy = async (req, res) => {
  try {
    const { threadId } = req.params;
    const { isPrivate } = req.body; // Accept the desired privacy status from the request body

    if (typeof isPrivate !== "boolean") {
      return res.status(400).json({ message: "Invalid value for isPrivate" });
    }

    const thread = await Thread.findById(threadId);

    if (!thread) return res.status(404).json({ message: "Thread not found" });

    // Check if the logged-in user is the thread owner
    if (thread.author.toString() !== req.user) {
      return res.status(403).json({ message: "Access denied" });
    }

    thread.isPrivate = isPrivate; // Update the privacy status
    await thread.save();

    res.json({
      message: `Thread visibility updated to ${
        isPrivate ? "private" : "public"
      }`,
      thread,
    });
  } catch (err) {
    console.error(err.message || err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getThreads,
  getThreadById,
  createThread,
  updateThread,
  deleteThread,
  likeThread,
  dislikeThread,
  getUserThreads,
  toggleThreadPrivacy,
};
