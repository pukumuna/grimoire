const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const decodedToken = jwt.verify( token, process.env.JWT_SECRET );
    //const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

    const userId = decodedToken.userId;

    req.auth = {userId: userId };

    next();

  } catch (error) { res.status(401).json({ error }); }
};
/**C'est ce middleware qui récupère : 
 * Authorization: Bearer eyJhbGciOi...
 * et produit : req.auth.userId
 */