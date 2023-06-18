const Card = require('../models/card');

module.exports.getCard = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => res.send({ likes: card.likes }))
  .catch(next);

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => res.send({ likes: card.likes }))
  .catch(next);

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
            .catch(next);
        }
      }
    })
    .catch(next);
};
