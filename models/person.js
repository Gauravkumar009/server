const mongoose = require('mongoose');


const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['student', 'Teacher', 'HOD', 'manager'],
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


const bcrypt = require('bcryptjs');

personSchema.pre('save', async function () {
    const person = this;

    // hash the password only if it has been modified (or is new)
    if (!person.isModified('password')) {
        return;
    }

    try {
        // hash password generation
        const salt = await bcrypt.genSalt(10);

        // hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        // override the plain password with the hashed one
        person.password = hashedPassword;
    } catch (err) {
        throw err;
    }
})

const Person = mongoose.model('Person', personSchema);
module.exports = Person;