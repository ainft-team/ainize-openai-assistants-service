const { AinizeUtils } = require('./ainizeUtils');
const { AINIZE_STATUS } = require('../constants');
const { sendSlackMsg } = require('../slack');

class ErrorHandler {
  static sendErrorResponse(err, req, res, next) {
    const statusCode = err.status || 500;
    const redirectPath = err.redirectPath || null;
    // FIXME(minsu): This will be removed when it is stablized. This console log is for debugging on the container.
    console.log(`error: ${err.message} with object(${JSON.stringify(err.errorOriginObject, null, 2)})`);
    sendSlackMsg(err.message, err.errorOriginObject);
    AinizeUtils.handleRequest({
        req, amount: 0, ainizeStatus: AINIZE_STATUS.FAILURE, responseData: err.message });
    return res.status(statusCode).json(
      ErrorUtil.serializeErrorMessage(statusCode, err.message, err.errorOriginObject, redirectPath));
  }
}

class ErrorUtil {
  static serializeErrorMessage(status, message, errorOriginObject = null, redirectPath = null) {
    return { status, message, errorOriginObject, redirectPath };
  }

  static setCustomError(status, message, errorOriginObject, redirectPath = null) {
    const error = new Error(message);
    error.errorOriginObject = errorOriginObject;
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
