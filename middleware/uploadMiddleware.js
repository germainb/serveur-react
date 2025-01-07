
const multer = require('multer');

// Set up multer storage
const storage = multer.memoryStorage();

// Multer middleware for avatar upload
const upload = multer({ storage });

module.exports = upload;
