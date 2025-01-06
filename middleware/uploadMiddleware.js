const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Define the upload directory
const uploadDir = path.join('uploads', 'avatars');

// Create the directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);  // Save to the 'uploads/avatars' directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix); // Save file with a unique name
  },
});

// Multer middleware for avatar upload
const upload = multer({ storage: storage });

module.exports = upload;
