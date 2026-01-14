const mongoose = require('mongoose');

//Define the person schema
const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ['student','Teacher','HOD','Manager'],
        required: true
    },
    mobile:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        required: true
    },
    salary:{
        type: Number,
        required: true
    }
})

//Create Person model
const Person = mongoose.model('Person',personSchema);
module.exports = Person;