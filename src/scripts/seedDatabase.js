// src/scripts/seedDatabase.js
const pool = require('../config/db');

// SQL to create the Users table if it doesn't exist
const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`;

const sampleUsers = [
    {
        username: 'john_doe',
        email: 'john.doe@example.com',
        password: 'password123', // Reminder: Hash in production
        phone_number: '1234567890'
    },
    {
        username: 'jane_doe',
        email: 'jane.doe@example.com',
        password: 'password123',
        phone_number: '1234567891'
    },
    {
        username: 'sam_smith',
        email: 'sam.smith@example.com',
        password: 'password123',
        phone_number: '1234567892'
    }
];

const insertSampleData = async () => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN'); // Start transaction
        await client.query(createUsersTable); // Create the table
        console.log('Users table created or verified successfully.');

        for (let user of sampleUsers) {
            const { username, email, password, phone_number } = user;
            await client.query(
                `INSERT INTO users (username, email, password, phone_number)
                 VALUES ($1, $2, $3, $4) ON CONFLICT (username) DO NOTHING`,
                [username, email, password, phone_number]
            );
        }

        await client.query('COMMIT'); // Commit the transaction
        console.log('Sample data inserted successfully');
    } catch (err) {
        await client.query('ROLLBACK'); // Rollback the transaction on error
        console.error('Error during DB setup:', err);
    } finally {
        client.release();
    }
};

insertSampleData();
