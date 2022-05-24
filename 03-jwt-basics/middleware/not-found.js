const { StatusCodes } = require("http-status-codes");

const notFound = (req, res) => {
  return res
    .status(StatusCodes.NOT_FOUND)
    .json({ msg: "Route is not defined" });
};

module.exports = notFound;
