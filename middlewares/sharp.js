const sharp = require('sharp');

module.exports = async (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }

    const filename =
      `${Date.now()}-${req.file.originalname
        .split(' ')
        .join('_')
        .replace(/\.[^/.]+$/, '')}.webp`;

    await sharp(req.file.buffer)
      .resize({
        width: 1200,
        withoutEnlargement: true
      })
      .webp({
        quality: 80
      })
      .toFile(`images/${filename}`);

    req.file.filename = filename;

    next();
  } catch (error) {
    next(error);
  }
};