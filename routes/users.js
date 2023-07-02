const usersRouter = require('express').Router();
const {
  validateId, validateUserUpdate, validateAvatar,
} = require('../middlewares/validation');
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:_id', validateId, getUserById);
usersRouter.patch('/me', validateUserUpdate, updateUser);
usersRouter.patch('/me/avatar', validateAvatar, updateAvatar);

module.exports = usersRouter;
