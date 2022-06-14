class CustomAPIError extends Error {
  constructor(messages) {
    super(messages);
  }
}

module.exports = CustomAPIError;
