// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/UserController');
const pool = require('../config/db')

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

module.exports = router;

// Function to query the database
const queryDatabase = async (queryText) => {
    const client = await pool.connect();
    try {
        const result = await client.query(queryText);
        console.log(result.rows); // Output the query results
    } catch (err) {
        console.error(err);
    } finally {
        client.release(); // Release the client back to the pool
    }
};

// Example query
queryDatabase('SELECT * FROM users');