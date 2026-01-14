const express = require('express')
const app = express()
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body



app.get('/', (req, res) => {
  res.send('Hello My I Help You!')
});

// Import the  Router files
const menuItemRoutes = require('./routes/menuItemRoutes');
const personRoutes = require('./routes/personRoutes');

// Use the Routers
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});