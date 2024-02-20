const { ainizeAdmin } = require('../ainize');
const { REST_MODE } = require('../env');

class AinizeUtils {
  static getDataFromServiceRequest = (req) => {
    const request = ainizeAdmin.internal.getDataFromServiceRequest(req);
    return request?.requestData;
  }

  static handleRequest = async ({ req, amount, ainizeStatus, responseData }) => {
    if (!REST_MODE) {
      return await ainizeAdmin.internal.handleRequest(req, amount, ainizeStatus, responseData);
    }
  }

  static handleDeposit = async (req) => {
    return await ainizeAdmin.internal.handleDeposit(req);
  }
}

module.exports = {
  AinizeUtils
};
