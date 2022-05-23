const { StatusCodes } = require("http-status-codes");

class CustomAPIError extends Error {
  constructor(messages) {
    super(messages);
    this.statusCode = this.statusCode;
  }
}

const createCustomError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode);
};
module.exports = { CustomAPIError, createCustomError };
