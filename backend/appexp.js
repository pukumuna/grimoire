const express = require('express');

const appexp = express();

const path = require('path');

const bookRoutes = require('./routes/book');

const userRoutes = require('./routes/user');

const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://zolhom13_db_user:sz3J9l0trr2hdwKB@cluster0.oxxutkf.mongodb.net/monvieuxgrimoire?retryWrites=true&w=majority&appName=Cluster0'
)
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

/*
app.post('/api/stuff', (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});


app.get('/api/stuff/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});
app.put('/api/stuff/:id', (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});
app.delete('/api/stuff/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});
app.get('/api/stuff', (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
}); 


app.use(bodyParser.json()); */

appexp.use('/images', express.static(path.join(__dirname, 'images')));
appexp.use('/api/books', bookRoutes);
appexp.use('/api/auth', userRoutes);


module.exports = appexp;