const { StatusCodes } = require("http-status-codes");

class CustomAPIError extends Error {
  constructor(messages) {
    super(messages);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

module.exports = CustomAPIError;
