const Card = require('../models/card');

const {
  BAD_REQUEST,
  NOT_FOUND,
} = require('../utils/errors');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      next();
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: err.message });
      } else {
        next();
      }
    });
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      res.status(NOT_FOUND).send({ message: 'Ошибка 404' });
    } else {
      res.send({ likes: card.likes });
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(BAD_REQUEST).send({ message: err.message });
    } else {
      next();
    }
  });

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      res.status(NOT_FOUND).send({ message: 'Ошибка 404' });
    } else {
      res.send({ likes: card.likes });
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(BAD_REQUEST).send({ message: err.message });
    } else {
      next();
    }
  });

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card) {
        const ownerId = card.owner.toString();
        const userId = req.user._id;
        if (ownerId === userId) {
          Card.findByIdAndDelete(req.params.cardId)
            .then((deleted) => {
              res.status(200).send({ data: deleted });
            })
            .catch(() => {
              next();
            });
        }
      } else {
        res.status(NOT_FOUND).send({ message: 'Ошибка 404' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: err.message });
      } else {
        next();
      }
    });
};
