const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator').default;

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },

  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
/**la spécification demande une adresse e-mail unique et un mot de passe haché. */