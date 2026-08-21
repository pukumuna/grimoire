const Book = require('../models/Book');

const User = require('../models/User');

const fs = require('fs'); //fs : file system (pour delete)

const path = require('path');

exports.createBook = async (req, res, next) => {
  try {
    const bookObject = JSON.parse(req.body.book);

    delete bookObject._id;

    const book = new Book({
      ...bookObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      ratings: [],
      averageRating: 0
    });

    await book.save();

    return res.status(201).json({
      message: 'Livre enregistré !'
    });

  } catch (error) {

    // Si Sharp avait déjà créé une image
    if (req.file?.filename) {

      const imagePath = path.join(
        __dirname,
        '../images',
        req.file.filename
      );

      try {
        await fs.promises.unlink(imagePath);
        console.log('Image supprimée après échec de création');
      } catch (unlinkError) {
        console.error(
          'Impossible de supprimer l’image :',
          unlinkError
        );
      }
    }

    return res.status(400).json({ error });
  }
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

exports.modifyBook = async (req, res, next) => {
  try {
    const book = await Book.findOne({ _id: req.params.id });

    if (!book) {
      return res.status(404).json({
        message: 'Livre non trouvé'
      });
    }

    // Vérification du propriétaire
    if (book.userId !== req.auth.userId) {
      return res.status(403).json({
        message: 'Requête non autorisée'
      });
    }

    let bookObject;

    if (req.file) {
        bookObject = {
          ...JSON.parse(req.body.book),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        };

      // Récupération du nom de l'ancienne image
      const oldFilename = book.imageUrl.split('/images/')[1];

      const oldImagePath = path.join(
        __dirname,
        '../images',
        oldFilename
      );

      // Suppression de l'ancienne image
      fs.unlink(oldImagePath, (error) => {
        if (error) {
          console.log(
            'Impossible de supprimer ancienne image :',
            error
          );
        } else {
          console.log('Ancienne image supprimée');
        }
      });

    } else {
      bookObject = {
        ...req.body
      };
    }

    delete bookObject.userId;

    await Book.updateOne(
      { _id: req.params.id },
      { ...bookObject, _id: req.params.id }
    );

    return res.status(200).json({
      message: 'Livre modifié !'
    });

  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.deleteBook = (req, res, next) => {
      
  Book.findOne({ _id: req.params.id })
    .then(book => {   
      // Vérifier que le livre existe
      if (!book) {
        return res.status(404).json({
          message: 'Livre non trouvé'
        });
      }
      // Vérifier que l'utilisateur connecté est bien le propriétaire
      if (book.userId !== req.auth.userId) {
        return res.status(403).json({
          message: 'Unauthorized request'
        });
      }

      // Récupérer le nom du fichier image depuis imageUrl
      const filename = book.imageUrl.split('/images/')[1];
      const imagePath = path.join(__dirname, '../images',  filename);

      // Supprimer l'image du dossier images
      fs.unlink(imagePath, (error) => {
        if (error) {
          // Supprimer ensuite le livre dans MongoDB
            console.log('ERREUR UNLINK =', error);
        }

        Book.deleteOne({ _id: req.params.id })
          .then((result) => {
            res.status(200).json({
              message: 'Livre supprimé !'
            });
          })
          .catch(error => {
            console.log('ERREUR DELETE MONGO =', error);
            res.status(400).json({ error });
          });
      });
      return null;
    }) //then(book)
    .catch(error => {
      console.log('ERREUR FINDONE =', error);
      res.status(400).json({ error });
    });
};

exports.rateBook = (req, res, next) => {
  const userId = req.auth.userId;
  const rating = Number(req.body.rating);

  if (rating < 0 || rating > 5) {
    return res.status(400).json({
      message: 'La note doit être comprise entre 0 et 5'
    });
  }

  Book.findOne({ _id: req.params.id })
    .then(book => {
      const alreadyRated = book.ratings.some(
        item => item.userId === userId
      );

      if (alreadyRated) {
        return res.status(400).json({
          message: 'Vous avez déjà noté ce livre'
        });
      }

      book.ratings.push({
        userId,
        grade: rating
      });

      const total = book.ratings.reduce(
        (sum, item) => sum + item.grade,
        0
      );

      book.averageRating =
        total / book.ratings.length;

      return book.save();
    })
    .then(book => {
      if (book) {
        res.status(200).json(book);
      }
    })
    .catch(error => {
      res.status(400).json({ error });
    });
};
