const { StatusCodes } = require("http-status-codes");
const jsonwebtoken = require("jsonwebtoken");
const UnauthorizedError = require("../errors/unauthorized");

const authenticationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Must provide token" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jsonwebtoken.verify(token, process.env.PRIVATE_KEY);

    const { id, username } = decoded;
    req.user = { id, username };
    return next();
  } catch (error) {
    const newError = new UnauthorizedError("Please register to get the token");
    return next(newError);
  }
};

module.exports = authenticationMiddleware;
