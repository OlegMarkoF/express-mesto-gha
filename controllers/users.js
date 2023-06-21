const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133',
  };

  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({
      data: {
        name: user.name,
        about: user.about,
        avatar,
      },
    }))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user.userId, { name, about })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user.userId, { avatar })
    .then((newAvatar) => res.send({ data: newAvatar }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch(next);
};
