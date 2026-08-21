const jwt = require('jsonwebtoken');

const path = require('path')

require('dotenv').config();
require('dotenv').config({
  path: path.join(__dirname, '../middlewares/.env')
});

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
  
    const decodedToken = jwt.verify( token, process.env.JWT_SECRET );

    const userId = decodedToken.userId;

    req.auth = {userId: userId };

    next();

  } catch (error) { console.log('ERREUR AUTH =', error);res.status(401).json({ error }); }
};
/**C'est ce middleware qui récupère : 
 * Authorization: Bearer eyJhbGciOi...
 * et produit : req.auth.userId
 */