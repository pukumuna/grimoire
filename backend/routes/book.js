const express = require('express');

const router = express.Router();

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer');

const bookCtrl = require('../controllers/book');

router.get('/bestrating', bookCtrl.getBestRatedBooks);

router.get('/', bookCtrl.getAllBooks);
router.get('/:id', bookCtrl.getOneBook);

router.post( '/', auth, multer, bookCtrl.createBook );

router.put( '/:id', auth, multer, bookCtrl.modifyBook );

/*outer.delete( '/:id', auth, bookCtrl.deleteBook ); */

/*router.post( '/:id/rating', auth, bookCtrl.rateBook );*/

module.exports = router;
/**
 * Remarque importante : mettre : router.get('/bestrating', ...) 
 * avant router.get('/:id', ...) sinon Express pourrait interpréter bestrating comme un id.
 */