exports.getOneBook = (req, res, next) => {
  Book.findOne({
    _id: req.params.id
  })
    .then(book => {
      res.status(200).json(book);
    })
    .catch(error => {
      res.status(404).json({ error });
    });
};