class CustomAPIError extends Error {
  constructor(messages, statusCode) {
    super(messages);
    this.statusCode = statusCode;
  }
}

module.exports = CustomAPIError;
