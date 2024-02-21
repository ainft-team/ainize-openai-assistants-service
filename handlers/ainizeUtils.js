const { ainizeHelper } = require('../ainize');
const { REST_MODE } = require('../env');

class AinizeUtils {
  static getDataFromServiceRequest = (req) => {
    const request = ainizeHelper.internal.getDataFromServiceRequest(req);
    return request?.requestData;
  }

  static handleRequest = async ({ req, amount, ainizeStatus, responseData }) => {
    if (!REST_MODE) {
      return await ainizeHelper.internal.handleRequest(req, amount, ainizeStatus, responseData);
    }
  }

  static handleDeposit = async (req) => {
    return await ainizeHelper.internal.handleDeposit(req);
  }

  static gg = async (req) => {
    return await ainizeHelper.
  }
}

module.exports = {
  AinizeUtils
};
