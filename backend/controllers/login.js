exports.login = (req, res, next) => {

  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'Identifiant ou mot de passe incorrect' });
      }
      console.log('user trouvé =', user);
      console.log('JWT_SECRET =', process.env.JWT_SECRET);

      bcrypt.compare( req.body.password, user.password )
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ message: 'Identifiant ou mot de passe incorrect' });
          }
          res.status(200).json({ userId: user._id,
            token: jwt.sign( { userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
          });
        })
        .catch(error => { res.status(500).json({ error }); });
    })
    .catch(error => { 
      console.error('ERREUR LOGIN :', error);
      res.status(500).json({ message: error.message}); });
};