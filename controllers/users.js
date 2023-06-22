const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail(() => {
      const error = new Error('Пользователь не найден');
      error.statusCode = 404;
      throw error;
    })
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ massage: 'Пользователь не найден' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ massage: err.massage });
      } else {
        res.status(500).send({ massage: 'Случилось непоправимое' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .orFail(() => {
      const error = new Error('Пользователь не найден');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({
      data: {
        name: user.name,
        about: user.about,
        avatar,
      },
    }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ massage: 'Пользователь не найден' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ massage: err.massage });
      } else {
        res.status(500).send({ massage: 'Случилось непоправимое' });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about })
    .orFail(() => {
      const error = new Error('Пользователь не найден');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ massage: 'Пользователь не найден' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ massage: err.massage });
      } else {
        res.status(500).send({ massage: 'Случилось непоправимое' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar })
    .orFail(() => {
      const error = new Error('Пользователь не найден');
      error.statusCode = 404;
      throw error;
    })
    .then((newAvatar) => res.send({ data: newAvatar }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ massage: 'Пользователь не найден' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ massage: err.massage });
      } else {
        res.status(500).send({ massage: 'Случилось непоправимое' });
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
        res.status(400).send({ massage: 'Id пользователя не найден' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ massage: err.massage });
      } else {
        res.status(500).send({ massage: 'Случилось непоправимое' });
      }
    });
};
