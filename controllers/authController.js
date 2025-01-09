
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { json } = require('body-parser');
const fs = require('fs');
const path = require('path');

// Generate JWT
const generateToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

// Signup controller
const registerUser = async (req, res) => {
    console.dir(req.body);
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        var img = [];
        var contentType = "";
        // Handle avatar upload
        if (req.file) {
            avatar = `${req.protocol}://${req.get('host')}/uploads/avatars/${req.file.filename}`;
            img = {
                data: req.file.buffer,
                contentType: req.file.mimetype
                }
            }
        else {
            avatar = `${req.protocol}://${req.get('host')}/uploads/avatars/defaultProfile.png`;
            let base64 = fs.readFileSync(path.join(__dirname,'../uploads/avatars/defaultProfile.png'), {encoding: 'base64'});
            const buffer = Buffer.from(base64, "base64");
            img = {
                data: buffer,
                contentType: 'image/png'
                }
            }
       
        // Create new user
        const user = await User.create({ name, email, password, avatar, img });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            img: user.img,
            token: generateToken(user._id)
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error:' + err });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
            avatar: user.avatar,
            img: user.img
        });
      
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' + err });
    }
};

// Get user profile
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get user 
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Signup controller
const updateAvatar = async (req, res) => {
    console.dir(req.body);
    try {
        const user = await User.findById(req.user);

        var img = [];
        var contentType = "";
        // Handle avatar upload
        if (req.file) {
            user.img = {
                data: req.file.buffer,
                contentType: req.file.mimetype
                }
            }
       
        await user.save();
        res.json(user);
        
    } catch (err) {
        res.status(500).json({ message: 'Server error:' + err });
    }
};

module.exports = { registerUser, loginUser, getMe, getUserById, updateAvatar };
