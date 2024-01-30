const Joi = require('joi');

const { ErrorUtil } = require('./error');
const { JOB_TYPES } = require('../constants');
const { ainizeAdmin } = require('../ainize');
const { REST_MODE } = require('../env');
const { joiSchema } = require('./joi');

class Middleware {
  static classifyJobType = (req, res, next) => {
    try {
      const { jobType } = REST_MODE ? req.body :
          ainizeAdmin.internal.getDataFromServiceRequest(req).requestData;
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

  static joiValidate = (req, res, next) => {
    const {
      jobType, model, name, description, instructions, tools, file_ids, metadata
    } = REST_MODE ? req.body :
        ainizeAdmin.internal.getDataFromServiceRequest(req).requestData;

    let validationResult;
    switch (jobType) {
      case JOB_TYPES.CREATE_ASSISTANT:
        validationResult = joiSchema.createAssistantSchema.validate({
          model, name, description, instructions, tools, file_ids, metadata
        });
        break;
    };

    if (!validationResult.error) {
      next();
      return;
    } else {
      throw ErrorUtil.setCustomError(422,
          `joi req validation error(${validationResult.error.details[0].message}).`);
    }
  }
};

module.exports = {
  Middleware
};
