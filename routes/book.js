const express = require('express');

const router = express.Router();

const auth = require('../middlewares/auth');

const multer = require('../middlewares/multer'); // load file in memoryStorage

const sharp = require('../middlewares/sharp');  // Compression file off memoryStorage

const bookCtrl = require('../controllers/book');

router.get('/bestrating', bookCtrl.getBestRatedBooks);

router.get('/', bookCtrl.getAllBooks);
router.get('/:id', bookCtrl.getOneBook);

router.post( '/', auth, multer, sharp, bookCtrl.createBook);

router.put( '/:id', auth, multer, sharp, bookCtrl.modifyBook);

router.delete( '/:id', auth, bookCtrl.deleteBook ); 

router.post('/:id/rating', auth, bookCtrl.rateBook);

module.exports = router;
/** Remarque importante ::: Mettre : router.get('/bestrating', ...) avant 
router.get('/:id', ...) sinon Express pourrait interpréter bestrating comme un id. */