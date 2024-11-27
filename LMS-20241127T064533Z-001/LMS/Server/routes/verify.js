const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.get('/verify', (req, res) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) return res.status(401).json({ message: 'Authorization header missing' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token missing' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return res.status(200).json({ message: 'Token is valid', user: decoded });
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
});

module.exports = router;