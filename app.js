const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const users = require('./routes/users');
const cards = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const {
  NOT_FOUND,
} = require('./utils/errors');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/users', users);
app.use('/cards', cards);
app.use('*', (req, res) => {
  res.status(NOT_FOUND).send({
    message: 'Ошибка 404',
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
