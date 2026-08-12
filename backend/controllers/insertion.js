const Book = require('../models/Book');

exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);

  delete bookObject._id;
  delete bookObject.userId;

  const book = new Book({
    ...bookObject,

    userId: req.auth.userId,

    imageUrl:
      `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,

    ratings: [],

    averageRating: 0
  });

  book.save()
    .then(() => {
      res.status(201).json({
        message: 'Livre enregistré !'
      });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
};
/**
 * Et ici on retrouve exactement le fonctionnement que nous avions étudié
 * Frontend React
      ↓
FormData
      ↓
book = JSON.stringify(...)
image = fichier
      ↓
Multer
      ↓
req.body.book
req.file
      ↓
JSON.parse(req.body.book)
 */