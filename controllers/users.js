const User = require('../models/user');
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('../utils/errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ massage: err.massage });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({
      data: {
        name: user.name,
        about: user.about,
        avatar,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ massage: 'Пользователь не найден' });
      } else if (err.statusCode === 404) {
        res.status(NOT_FOUND).send({ massage: err.massage });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ massage: err.massage });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      const error = new Error('Пользователь не найден');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ massage: err.massage });
      } else if (err.statusCode === 404) {
        res.status(NOT_FOUND).send({ massage: err.massage });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ massage: err.massage });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      const error = new Error('Пользователь не найден');
      error.statusCode = 404;
      throw error;
    })
    .then((newAvatar) => res.send({ data: newAvatar }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ massage: err.massage });
      } else if (err.statusCode === 404) {
        res.status(NOT_FOUND).send({ massage: err.massage });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ massage: err.massage });
      }
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params._id)
    .orFail(() => {
      const error = new Error('Пользователь по id не найден');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ massage: err.massage });
      } else if (err.statusCode === 404) {
        res.status(NOT_FOUND).send({ massage: err.massage });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ massage: err.massage });
      }
    });
};
