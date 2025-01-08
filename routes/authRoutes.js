const express = require('express');
const { registerUser, loginUser, getMe, getUserById } = require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
   });
router.post('/register', upload.single('avatar'), registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getMe);
router.get('/:id', getUserById);


module.exports = router;
