const { ErrorUtil } = require('./error');
const { JOB_TYPES } = require('../constants');
const { AinizeUtils } = require('./ainizeUtils');
const { ainizeHelper } = require('../ainize');
const { REST_MODE } = require('../env');
const { joiSchema } = require('./joi');

class Middleware {
  static classifyJobType = (req, res, next) => {
    try {
      const { jobType } = REST_MODE ? req.body : AinizeUtils.getDataFromServiceRequest(req);
      if (!Object.values(JOB_TYPES).includes(jobType)) {
        throw ErrorUtil.setCustomError(422, `The given job type(${jobType}) is not on the list.`);
      } else {
        next();
        return;
      }
    } catch (error) {
      throw ErrorUtil.setCustomError(500, error.message);
    };
  };

  static joiValidate = (req, res, next) => {
    const {
      jobType, model, name, description, instructions, tools, file_ids, metadata, messages,
      role, content, additional_instructions,
      limit, order, after, before,
      assistantId, threadId, messageId, runId, stepId
    } = REST_MODE ? req.body : AinizeUtils.getDataFromServiceRequest(req);

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
        });
        break;
      case JOB_TYPES.RETRIEVE_THREAD:
        validationResult = joiSchema.retrieveThreadSchema.validate({
          thread_id: threadId
        });
        break;
      case JOB_TYPES.MODIFY_THREAD:
        validationResult = joiSchema.modifyThreadSchema.validate({
          metadata
        });
        break;
      case JOB_TYPES.DELETE_THREAD:
        validationResult = joiSchema.deleteThreadSchema.validate({
          thread_id: threadId
        });
        break;
      case JOB_TYPES.CREATE_MESSAGE:
        validationResult = joiSchema.createMessageSchema.validate({
          thread_id: threadId, role, content, file_ids, metadata
        });
        break;
      case JOB_TYPES.LIST_MESSAGES:
        validationResult = joiSchema.listMessagesSchema.validate({
          thread_id: threadId, limit, order, after, before
        });
        break;
      case JOB_TYPES.RETRIEVE_MESSAGE:
        validationResult = joiSchema.retrieveMessageSchema.validate({
          thread_id: threadId, message_id: messageId
        });
        break;
      case JOB_TYPES.MODIFY_MESSAGE:
        validationResult = joiSchema.modifyMessageSchema.validate({
          thread_id: threadId, message_id: messageId, metadata
        });
        break;
      case JOB_TYPES.CREATE_RUN:
        validationResult = joiSchema.createRunSchema.validate({
          thread_id: threadId, assistant_id: assistantId, model, instructions, additional_instructions, tools, metadata
        });
        break;
      case JOB_TYPES.LIST_RUNS:
        validationResult = joiSchema.listRunsSchema.validate({
          thread_id: threadId, limit, order, after, before
        });
        break;
      case JOB_TYPES.LIST_RUN_STEPS:
        validationResult = joiSchema.listRunStepsSchema.validate({
          thread_id: threadId, run_id: runId, limit, order, after, before
        });
        break;
      case JOB_TYPES.RETRIEVE_RUN:
        validationResult = joiSchema.retrieveRunSchema.validate({
          thread_id: threadId, run_id: runId
        });
        break;
      case JOB_TYPES.RETRIEVE_RUN_STEP:
        validationResult = joiSchema.retrieveRunStepSchema.validate({
          thread_id: threadId, run_id: runId, step_id: stepId
        });
        break;
      case JOB_TYPES.MODIFY_RUN:
        validationResult = joiSchema.modifyRunSchema.validate({
          thread_id: threadId, run_id: runId, metadata
        });
        break;
      case JOB_TYPES.CANCEL_RUN:
        validationResult = joiSchema.cancelRunSchema.validate({
          thread_id: threadId, run_id: runId
        })
    };

    if (!validationResult.error) {
      next();
      return;
    } else {
      throw ErrorUtil.setCustomError(422,
          `joi req validation error(${validationResult.error.details[0].message}).`,
          validationResult);
    }
  };

  static preventMultipleTriggering = (req, res, next) => {
    if (REST_MODE) {
      next();
      return;
    } else {
      return ainizeHelper.middleware.blockchainTriggerFilter(req, res, next);
    }
  }
};

module.exports = {
  Middleware
};
