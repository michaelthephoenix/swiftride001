// src/models/UserModel.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Add additional fields as needed
});

module.exports = mongoose.model('User', UserSchema);
