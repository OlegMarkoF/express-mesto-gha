const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://images.uznayvse.ru/960x540/p/images/content/2021/2/uzn_16141552734.jpg',
  },
});

module.exports = mongoose.model('user', userSchema);
