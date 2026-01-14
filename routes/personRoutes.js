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

module.exports = router;