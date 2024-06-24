// src/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    registeredAt: {
        type: Date,
        default: Date.now
    },
    // Additional fields like address, profile picture URL, etc. can be added here
});

const User = mongoose.model('User', userSchema);

module.exports = User;
