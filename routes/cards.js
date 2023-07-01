const cardsRouter = require('express').Router();
const {
  validateId, validateCard,
} = require('../middlewares/validation');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', validateCard, createCard);
cardsRouter.delete('/:cardId', validateId, deleteCard);
cardsRouter.put('/:cardId/likes', validateId, likeCard);
cardsRouter.delete('/:cardId/likes', validateId, dislikeCard);

module.exports = cardsRouter;
