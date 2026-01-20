const express = require('express')
const app = express()
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); 
const PORT = process.env.PORT || 3000;



app.get('/', (req, res) => {
  res.send('Hello My I Help You!')
});


const menuItemRoutes = require('./routes/menuItemRoutes');
const personRoutes = require('./routes/personRoutes');


app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});