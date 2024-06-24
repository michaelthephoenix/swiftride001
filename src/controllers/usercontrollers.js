// src/controllers/UserController.js
const User = require('../models/UserModel');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        // Here, you would typically hash the password and save the user
        const user = new User(req.body);
        await user.save();
        res.status(201).send({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

// User login
exports.loginUser = async (req, res) => {
    try {
        // Authentication logic here
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        // Dummy password check, replace with proper hash comparison
        if (user && password === user.password) {
            res.status(200).json({ message: 'User logged in successfully', user });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};
