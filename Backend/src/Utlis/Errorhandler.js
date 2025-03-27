class ErrorHandler extends Error {
  constructor(statusCode, message) {
      super(message);
      this.statsuCode = statusCode;
  }
}

module.exports = ErrorHandler;