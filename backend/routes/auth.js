const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.js');
const authMiddleware = require('../middleware/auth.js');

router.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, mobile, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ firstName, lastName, email, mobile, password: hashedPassword });
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token ,message:"USer Created Successfully"});
    } catch (error) {
        
        res.status(400).json({ error: 'Signup failed' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
        console.log(process.env.JWT_SECRET)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        
        res.json({ token ,message:"User LoggedIn Successfully!"});
    } catch (error) {
        res.status(400).json({ error: 'Login failed' });
    }
});

router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: 'Unable to fetch user' });
    }
});

module.exports = router;
