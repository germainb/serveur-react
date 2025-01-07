const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Define the upload directory
//const uploadDir = path.join(__dirname, '..','uploads', 'avatars');

// Create the directory if it doesn't exist
/*
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
*/
// Set up multer storage
const storage = multer.memoryStorage();

// Multer middleware for avatar upload
const upload = multer({ storage });

module.exports = upload;
