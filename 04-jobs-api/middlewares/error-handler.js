const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  let customError = {
    /* ------------ statusCode is from CostomAPIErrorClass ------------ */
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, please try again",
  };

  if (err.name === "ValidationError") {
    customError.msg = "Empty field";
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.code && err.code === 11000) {
    customError.msg = "Email is already used";
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // return res.status(customError.statusCode).json({ err });
  return res.statusCode(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
