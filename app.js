const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/users');
const cards = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133',
  };
  next();
});

app.use('/users', users);
app.use('/cards', cards);
app.use('*', (req, res) => {
  res.send({
    message: 'Произошла ошибка',
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
