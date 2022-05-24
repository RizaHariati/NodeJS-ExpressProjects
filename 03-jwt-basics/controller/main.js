require("dotenv").config();
const { StatusCodes } = require("http-status-codes");
const jsonwebtoken = require("jsonwebtoken");
const BadRequestError = require("../errors/bad-request");
const UnauthorizedError = require("../errors/unauthorized");

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      const error = new BadRequestError("Must provide username and password");
      return next(error);
    }

    const id = new Date().getDate();

    const token = jsonwebtoken.sign({ id, username }, process.env.PRIVATE_KEY, {
      expiresIn: "30d",
    });

    res.status(200).json({ msg: "user created", token });
  } catch (error) {
    return next(error);
  }
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  try {
    res.status(200).json({
      msg: `Hello, ${req.user.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  login,
  dashboard,
};
