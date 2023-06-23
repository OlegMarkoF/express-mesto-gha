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
    _id: '64960c9f439cd781e5df1689',
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
