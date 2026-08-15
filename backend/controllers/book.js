const Book = require('../models/Book');

const User = require('../models/User');

exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);

  delete bookObject._id;
  delete bookObject.userId;

  const book = new Book({ ...bookObject, userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    ratings: [], averageRating: 0
  });

  book.save()
    .then (() => { res.status(201).json({ message: 'Livre enregistré !' }); })
    .catch (error => { res.status(400).json({ error }); });
};
/**
 * Et ici on retrouve exactement le fonctionnement que nous avions étudié
 * Frontend React -> FormData -> book = JSON.stringify(...) + image = fichier -> Multer
 * -> req.body.book + req.file -> JSON.parse(req.body.book) [-> signifie : ensuite]
 */
exports.getOneBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then(book => { res.status(200).json(book); })
    .catch(error => { res.status(404).json({ error }); });
};

exports.getAllBooks = (req, res, next) => {
  Book.find()
    .then(books => { res.status(200).json(books); })
    .catch(error => { res.status(400).json({ error }); });
};

exports.getBestRatedBooks = (req, res, next) => {
  Book.find()
    .sort({ averageRating: -1 })
    .limit(3)
    .then(books => {
      res.status(200).json(books);
    })
    .catch(error => {
      res.status(400).json({ error });
    });
};

exports.modifyBook = (req, res, next) => {
  const bookObject = req.file ? { ...JSON.parse(req.body.book), 
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }
        : { ...req.body };

  delete bookObject.userId;
  delete bookObject._id;

  Book.findOne({ _id: req.params.id })
    .then(book => {
      if (book.userId !== req.auth.userId) {
          return res.status(403).json({ message: 'Unauthorized request' });
      }                 // Attention code suivante manque userid !!!
      Book.updateOne ({ _id: req.params.id }, { ...bookObject, _id: req.params.id } )
        .then(() => { res.status(200).json({ message: 'Livre modifié !' }); })
        .catch(error => { res.status(400).json({ error }); });
    })
    .catch(error => { res.status(400).json({ error }); });
};
