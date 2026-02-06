const mongoose = require('mongoose');
require('dotenv').config();
const Person = require('../models/person');

const mongoURL = process.env.DB_URL;
mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected', async () => {
    console.log('Connected to MongoDB');
    try {
        const usernameToCheck = 'gaurav';
        console.log(`Checking for user with username: "${usernameToCheck}"...`);

        const user = await Person.findOne({ username: usernameToCheck });

        if (user) {
            console.log('User FOUND:');
            console.log(`- Username: ${user.username}`);
            console.log(`- Email: ${user.email}`);
            console.log(`- Password Hash: ${user.password}`);
        } else {
            console.log(`User "${usernameToCheck}" NOT FOUND.`);

            // Allow checking by email too just in case
            const allUsers = await Person.find({});
            console.log(`Total users in DB: ${allUsers.length}`);
            console.log('Usernames present:', allUsers.map(u => u.username));
        }
    } catch (err) {
        console.error("Error:", err);
    } finally {
        mongoose.connection.close();
        process.exit(0);
    }
});
