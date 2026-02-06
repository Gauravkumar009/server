const express = require('express')
const app = express()
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next();
}

app.use(logRequest);

app.use(passport.initialize());

const localAuthMiddleware =
  passport.authenticate("local", { session: false });

app.post('/login', passport.authenticate('local', { session: false }), async (req, res) => {
  try {
    return res.status(200).json({
      message: 'Login successful',
      user: req.user.username
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello My I Help You!')
});

const menuItemRoutes = require('./routes/menuItemRoutes');
const personRoutes = require('./routes/personRoutes');


app.use('/person',localAuthMiddleware, personRoutes);
app.use('/menu', menuItemRoutes);


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});