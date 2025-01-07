const express = require('express');
const { registerUser, loginUser, getMe, getUserById } = require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', upload.single('avatar'), registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getMe);
router.get('/users', getUserById);


module.exports = router;
