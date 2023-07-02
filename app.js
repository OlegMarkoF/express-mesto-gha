const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const users = require('./routes/users');
const cards = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { NotFoundError } = require('./utils/NotFoundError');
const auth = require('./middlewares/auth');
const {
  validateUser, validateLogin,
} = require('./middlewares/validation');
const errorHandler = require('./middlewares/errors');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/signin', validateLogin, login);
app.post('/signup', validateUser, createUser);

app.use('/users', auth, users);
app.use('/cards', auth, cards);
app.use('/*', () => {
  throw new NotFoundError('Страница не найдена');
});
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
