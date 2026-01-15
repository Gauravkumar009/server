const express = require('express');
const router = express.Router();

const Person = require('./../models/person');

router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/', async (req, res) => {
    try {
        const data = req.body;

        const response = Array.isArray(data)
            ? await Person.insertMany(data)
            : await new Person(data).save();

        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;

        const validWorkTypes = ['student', 'Teacher', 'HOD', 'Manager'];
        if (!validWorkTypes.includes(workType)) {
            return res.status(404).json({ error: 'Invalid workType!' });
        }

        const response = await Person.find({ work: workType });
        console.log('response fetched');

        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatePersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
            new: true,
            runValidators: true
        })
        if (!response) {
            return res.status(404).json({ erroe: 'person not found' });
        }
        console.log('Data Updated')
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: 'Person not Found' });
        }
        console.log('Data Deleted')
        res.status(200).json({message:"person Deleted Successfully"});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


module.exports = router;