const { ainizeAdmin } = require('../ainize');
const { AINIZE_STATUS } = require('../constants');
const { REST_MODE } = require('../env');
const { sendSlackMsg } = require('../slack');

class ErrorHandler {
  static sendErrorResponse(err, req, res, next) {
    const statusCode = err.status || 500;
    const redirectPath = err.redirectPath || null;
    // FIXME(minsu): This will be removed when it is stablized. This console log is for debugging on the container.
    console.log(`error: ${err.message}`);
    sendSlackMsg(err.message);
    if (!REST_MODE) ainizeAdmin.internal.handleRequest(req, 0, AINIZE_STATUS.FAILURE, err.message);
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
