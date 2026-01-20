const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');


router.get('/', async (req, res) => {
  try {
    const data = await MenuItem.find();
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
      ? await MenuItem.insertMany(data)
      : await new MenuItem(data).save();

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/:tasteType', async (req, res) => {
  try {
    const tasteType = req.params.tasteType;

    const validtasteTypes = ['sweet', 'spicy', 'sour'];
     if (!validtasteTypes.includes(tasteType)) {
      return res.status(404).json({ error: 'Invalid workType!' });
    }

    const response = await MenuItem.find({ taste: tasteType });
    console.log('response fetched');

    res.status(200).json(response);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
