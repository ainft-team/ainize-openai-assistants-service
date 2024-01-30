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
      jobType, model, name, description, instructions, tools, file_ids, metadata, messages,
      limit, order, after, before,
      assistantId
    } = REST_MODE ? req.body :
        ainizeAdmin.internal.getDataFromServiceRequest(req).requestData;

    let validationResult;
    switch (jobType) {
      case JOB_TYPES.CREATE_ASSISTANT:
        validationResult = joiSchema.createAssistantSchema.validate({
          model, name, description, instructions, tools, file_ids, metadata
        });
        break;
      case JOB_TYPES.LIST_ASSISTANTS:
        validationResult = joiSchema.listAssistantsSchema.validate({
          limit, order, after, before
        });
        break;
      case JOB_TYPES.RETRIEVE_ASSISTANT:
        validationResult = joiSchema.retrieveAssistantSchema.validate({
          assistant_id: assistantId
        });
        break;
      case JOB_TYPES.MODIFY_ASSISTANT:
        validationResult = joiSchema.modifyAssistantSchema.validate({
          assistant_id: assistantId, model, name, description, instructions, tools, file_ids, metadata
        });
        break;
      case JOB_TYPES.DELETE_ASSISTANT:
        validationResult = joiSchema.deleteAssistantSchema.validate({
          assistant_id: assistantId
        });
        break;
      case JOB_TYPES.CREATE_THREAD:
        validationResult = joiSchema.createThreadSchema.validate({
          messages, metadata
        })
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
