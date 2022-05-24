const { StatusCodes } = require("http-status-codes");

const notFound = (req, res) => {
  return res
    .status(StatusCodes.NOT_FOUND)
    .json({ msg: "Something went wrong please try again" });
};

module.exports = notFound;
