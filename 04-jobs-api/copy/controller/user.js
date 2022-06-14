const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");
const UnauthorizedError = require("../errors/unauthorized");
const User = require("../models/User");

const register = async (req, res) => {
  const createUser = await User.create({ ...req.body });
  const token = createUser.createJWT();
  res.status(StatusCodes.CREATED).json({ createUser, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Must provide email/password");
  }

  const loginUser = await User.findOne({ email });
  if (!loginUser) {
    throw new UnauthorizedError("wrong email");
  }

  const passwordMatch = await loginUser.comparePassword(password);
  if (!passwordMatch) {
    throw new UnauthorizedError("password");
  }

  const token = loginUser.createJWT();

  res
    .status(StatusCodes.ACCEPTED)
    .json({ msg: "User verified", user: { name: loginUser.name }, token });
};

module.exports = { register, login };
