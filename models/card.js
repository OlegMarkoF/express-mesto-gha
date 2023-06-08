const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  link: {
    type: String,
    required: true,

  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  },
  createdAt: {

  },
});

module.exports = mongoose.model('card', cardSchema);
