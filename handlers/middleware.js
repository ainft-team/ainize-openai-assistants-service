const { ErrorUtil } = require('./error');
const { JOB_TYPES } = require('../constants');
const { ainizeAdmin } = require('../ainize');
const { REST_MODE } = require('../env');

class Middleware {
  static classifyJobType = (req, res, next) => {
    try {
      const { jobType } = REST_MODE ? req.body :
          (ainizeAdmin.internal.getDataFromServiceRequest(req))().requestData;
      if (!Object.values(JOB_TYPES).includes(jobType)) {
        throw ErrorUtil.setCustomError(422, `The given job type(${jobType}) is not on the list.`);
      } else {
        next();
        return;
      }
    } catch (error) {
      throw ErrorUtil.setCustomError(500, error);
    };
  };
};

module.exports = {
  Middleware
};
