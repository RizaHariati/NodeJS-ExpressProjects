const jsonwebtoken = require("jsonwebtoken");
const UnauthorizedError = require("../errors/unauthorized");

const authentificationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Authentification invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const user = jsonwebtoken.verify(token, process.env.JWT_KEY);
    const { userId, name } = user;
    req.user = { userId, name };
    next();
  } catch (error) {
    throw new UnauthorizedError("Authentification invalid");
  }
};

module.exports = authentificationMiddleware;
