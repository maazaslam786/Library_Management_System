const express = require("express");
const { authenticateUser, registerUser } = require("../controllers/authController");

const router = express.Router();

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    const isAuthenticated = authenticateUser(username, password);
    if (isAuthenticated) {
        res.status(200).json({ message: "Login successful" });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

router.post("/signup", (req, res) => {
    const { username, password } = req.body;
    try {
        registerUser(username, password);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
