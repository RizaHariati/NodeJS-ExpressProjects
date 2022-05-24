require("dotenv").config();
const { StatusCodes } = require("http-status-codes");
const jsonwebtoken = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Must provide username and password" });
  }

  const id = new Date().getDate();

  const token = jsonwebtoken.sign({ id, username }, process.env.PRIVATE_KEY, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
  res.end();
};

module.exports = {
  login,
  dashboard,
};
