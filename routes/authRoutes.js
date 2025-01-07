const express = require('express');
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', upload.single('avatar'), registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getMe);

module.exports = router;
