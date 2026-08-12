exports.modifyBook = (req, res, next) => {

  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),

        imageUrl:
          `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      }
    : {
        ...req.body
      };

  delete bookObject.userId;
  delete bookObject._id;

  Book.findOne({
    _id: req.params.id
  })
    .then(book => {

      if (book.userId !== req.auth.userId) {
        return res.status(403).json({
          message: 'Unauthorized request'
        });
      }

      Book.updateOne(
        {
          _id: req.params.id
        },
        {
          ...bookObject,
          _id: req.params.id
        }
      )
        .then(() => {
          res.status(200).json({
            message: 'Livre modifié !'
          });
        })
        .catch(error => {
          res.status(400).json({ error });
        });

    })
    .catch(error => {
      res.status(400).json({ error });
    });
};