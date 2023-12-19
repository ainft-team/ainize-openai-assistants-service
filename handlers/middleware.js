const { ErrorUtil } = require('./error');
const { Utils } = require('./utils');
const { JOB_TYPES } = require('../constants');

class Middleware {
  static classifyJobType = (req, res, next) => {
    try {
      const { jobType } = req.body;
      if (!Object.values(JOB_TYPES).includes(jobType)) {
        throw ErrorUtil.setCustomError(422, `The given job type(${jobType}) is not on the list.`);
      } else {
        res.locals.jobType = jobType;
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
