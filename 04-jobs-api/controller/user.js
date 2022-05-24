const { StatusCodes } = require("http-status-codes");

const register = (req, res, next) => {
  res.status(StatusCodes.CREATED).json({ msg: "User Created" });
};

const login = (req, res, next) => {
  res.status(StatusCodes.ACCEPTED).json({ msg: "User Verified" });
};

module.exports = { register, login };
