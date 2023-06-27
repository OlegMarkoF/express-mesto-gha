module.exports = (req, res, next) => {
  let payload;

  req.user = payload;
  next();
};
