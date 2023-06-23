const Card = require('../models/card');

const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('../utils/errors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      console.log(`Произошла ошибка: ${err.name} ${err.message}`);
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ massage: err.massage });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ massage: err.massage });
      }
    });
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      res.status(NOT_FOUND).send({ massage: 'Ошибка 404' });
    } else {
      res.send({ likes: card.likes });
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(BAD_REQUEST).send({ massage: err.massage });
    } else {
      res.status(INTERNAL_SERVER_ERROR).send({ massage: err.massage });
    }
  });

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      res.status(NOT_FOUND).send({ massage: 'Ошибка 404' });
    } else {
      res.send({ likes: card.likes });
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(BAD_REQUEST).send({ massage: err.massage });
    } else {
      res.status(INTERNAL_SERVER_ERROR).send({ massage: err.massage });
    }
  });

module.exports.deleteCard = (req, res) => {
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
            .catch((err) => {
              console.log(`Произошла ошибка: ${err.name} ${err.message}`);
            });
        }
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ massage: err.massage });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ massage: err.massage });
      }
    });
};
