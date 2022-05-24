const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  res.send(err);
  next();
};

module.exports = errorHandlerMiddleware;
