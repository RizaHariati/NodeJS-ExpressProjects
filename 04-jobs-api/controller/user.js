const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");
const UnauthorizedError = require("../errors/unauthorized");
const User = require("../models/User");

const register = async (req, res, next) => {
  try {
    const createUser = await User.create({ ...req.body });
    const token = createUser.createJWT();
    res.status(StatusCodes.CREATED).json({ createUser, token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new BadRequestError("Must provide email/password"));
  }

  const loginUser = await User.findOne({ email });
  if (!loginUser) {
    next(new UnauthorizedError("wrong email/password"));
  }

  const passwordMatch = await loginUser.comparePassword(password);
  if (!passwordMatch) {
    next(new UnauthorizedError("wrong email/password"));
  }

  const token = await loginUser.createJWT();

  res
    .status(StatusCodes.ACCEPTED)
    .json({ msg: "User verified", name: loginUser.name, token });
};

module.exports = { register, login };
