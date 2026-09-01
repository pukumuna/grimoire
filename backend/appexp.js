const express = require('express');

const helmet = require('helmet'); // Pour sécuriser davantage en-tête Http

const multer = require('multer'); //Si File > 4Mo (fin du module appexp)

const appexp = express();

const path = require('path');

const bookRoutes = require('./routes/book');

const userRoutes = require('./routes/user');

const mongoose = require('mongoose');

require('dotenv').config({
  path: path.join(__dirname, '../.env')
});

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((error) => {
  console.log('Connexion à MongoDB échouée !');
  console.error(error);
});

appexp.use(express.json()); /* Pour gérer la requête POST venant de l'application front-end, 
on a besoin d'en extraire le corps JSON. Pour cela, vous avez juste besoin de ce middleware 
très simple, mis à disposition par le framework Express. Avec ceci Express prend toutes 
les requêtes qui ont comme Content-Type <application/json> et met à disposition leur 
<body> directement sur l'objet req [app.post('/api/stuff', (req, res, next) => {
 console.log(req.body); : console.log(req.body)) res.status(201).json({ mess: .'Obj ...'] */

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
appexp.use(helmet());  //Pour la Sécurité
appexp.use('/api/books', bookRoutes);
appexp.use('/api/auth', userRoutes);

appexp.use((err, req, res, next) => {

  if (err instanceof multer.MulterError) {

    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: 'L’image ne doit pas dépasser 4 Mo'
      });
    }

    return res.status(400).json({
      message: 'Erreur lors du téléchargement de l’image'
    });
  }

  return res.status(500).json({
    message: 'Erreur interne du serveur'
  });
});

module.exports = appexp;