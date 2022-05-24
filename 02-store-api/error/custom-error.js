class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const customErrorHandler = (msg, code) => {
  return new CustomAPIError(msg, code);
};

module.exports = { CustomAPIError, customErrorHandler };
