const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const authMiddleware = require('./middleware');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, fullName, email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, fullName, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'Successful registration' });
    } catch (err) {
        res.status(500).json({ message: 'Registration failed', error: err.message });
    }
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: 'Invalid email'});
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({message: 'Invalid password'});
        }

        const token = jwt.sign({userId: user._id}, 'secret_key', {expiresIn: '1h'});
        res.json({token});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Login failed', error: err });
    }
});

router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({message : 'User not found'});
        }

        const profile = {
            username: user.username,
            name: user.fullName,
            email: user.email
        };

        res.status(200).json({message : 'User profile fetched successfully', profile});
    } catch (err) {
        res.status(500).json({message : 'Failed to fetch user data', error : err});
    }
});

module.exports = router;
