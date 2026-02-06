const mongoose = require('mongoose');
require('dotenv').config();
const Person = require('../models/person');
const bcrypt = require('bcryptjs'); // Needed to manually hash if save hook is tricky, but save hook is better

const mongoURL = process.env.DB_URL;
mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected', async () => {
    console.log('Connected to MongoDB');
    try {
        const username = 'gaurav';
        const user = await Person.findOne({ username: username });

        if (!user) {
            console.log('User not found!');
        } else {
            console.log(`Found user ${user.username}. Current password length: ${user.password.length}`);

            // We need to trigger the pre-save hook. 
            // The hook checks `if (!person.isModified('password'))`.
            // Since the value '123456' matches current value, mongoose might skip it.
            user.password = '123456';
            user.markModified('password'); // FORCE modification flag

            await user.save();
            console.log('User saved. Password should now be hashed.');

            // Verify
            const updatedUser = await Person.findOne({ username: username });
            console.log(`New password hash: ${updatedUser.password}`);
            console.log(`Is hashed? ${updatedUser.password.startsWith('$2')}`);
        }
    } catch (err) {
        console.error("Error:", err);
    } finally {
        mongoose.connection.close();
        process.exit(0);
    }
});
