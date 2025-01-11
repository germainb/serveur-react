const express = require('express');
var cors = require('cors');
const { registerUser, loginUser, getMe, getUserById, updateAvatar } = require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(cors())
router.post('/register', upload.single('avatar'), registerUser);
router.post('/updateAvatar/:id',upload.single('avatar'), updateAvatar);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getMe);
router.get('/:id', getUserById);


module.exports = router;
