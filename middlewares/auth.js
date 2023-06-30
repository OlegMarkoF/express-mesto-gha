const jwt = require('jsonwebtoken');

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, '');
  } catch (err) {
    next(err);
  }
  req.user = payload;
  next();
};