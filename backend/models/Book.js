const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  userId: { type: String, required: true },         // identifiant mongoDB de record du livre
  title: { type: String, required: true },          // titre du livre
  author: { type: String, required: true },         // auteur du livre
  imageUrl: { type: String, required: true },       // illustration/couverture du livre
  year: { type: Number, required: true },           // année de publication du livre
  genre: { type: String, required: true },          // genre donné à un livre
  price: { type: Number, required: true },          // Prix donné à un livre
  ratings: [{ 
    userId: { type: String, required: true },      // userid de celui qui a noté 
    grade: { type: Number, required: true }        // Note donné à un livre 
  }],                                              // Notes donné à un livre
  averageRating: { type: Number, required: true }, // Note moyenne du livre
});

module.exports = mongoose.model('Book', bookSchema);