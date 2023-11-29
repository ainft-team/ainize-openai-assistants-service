class ErrorHandler {
  static sendErrorResponse(err, req, res, next) {
    const statusCode = err.status || 500;
    const redirectPath = err.redirectPath || null;
    return res.status(statusCode).json(
      ErrorUtil.serializeErrorMessage(statusCode, err.message, redirectPath));
  }
}

class ErrorUtil {
  static serializeErrorMessage(status, message, redirectPath = null) {
    return { status, message, redirectPath };
  }

  static setCustomError(status, message, redirectPath = null) {
    const error = new Error(message);
    error.status = status;
    if (redirectPath) {
      error.redirectPath;
    }
    return error;
  }
}

module.exports = {
  ErrorHandler,
  ErrorUtil
};
