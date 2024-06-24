// src/config/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Ensure this is in your .env file
    // Additional options like ssl: { rejectUnauthorized: false } might be required for production
});

module.exports = pool;
