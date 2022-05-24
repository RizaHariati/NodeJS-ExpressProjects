const BadRequestError = require("./bad-request");
const CustomAPIError = require("./custom-api");
const UnauthorizedError = require("./unauthorized");

module.exports = {
  CustomAPIError,
  BadRequestError,
  UnauthorizedError,
};
