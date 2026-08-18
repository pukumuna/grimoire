const multer = require('multer');

const storage = multer.memoryStorage(); // Mise en mémoire de l'image reçue

module.exports = multer({
  storage,
  limits: { fileSize: 4 * 1024 * 1024   }
}).single('image');