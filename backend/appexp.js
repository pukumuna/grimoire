const express = require('express');

const helmet = require('helmet'); // Pour sécuriser davantage en-tête Http

const appexp = express();

require('dotenv').config();

const path = require('path');

const bookRoutes = require('./routes/book');

const userRoutes = require('./routes/user');

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((error) => {
  console.log('Connexion à MongoDB échouée !');
  console.error(error);
});

appexp.use(express.json()); /* app.use(bodyParser.json()); avec const bodyParser = require(body-parser) */

appexp.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  } 
  next();
});

appexp.use('/images', express.static(path.join(__dirname, 'images')));
appexp.use(helmet());
appexp.use('/api/books', bookRoutes);
appexp.use('/api/auth', userRoutes);


module.exports = appexp;