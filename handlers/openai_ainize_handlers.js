const _ = require('lodash');
const { ErrorUtil } = require('./error');
const { Utils } = require('./utils');
const { getRequestMaterialsFromJobType, callOpenai } = require('../data');
const { AinizeUtils } = require('./ainizeUtils');
const { AINIZE_STATUS, JOB_TYPES } = require('../constants');
const { REST_MODE } = require('../env');

// TODO(all): Fill in the handlers.
class OpenaiAinizeHandler {
  static _preprocessUserInputForRequestBody = ({
    model, name, description, instructions, metadata, role, content, assistantId
  }) => {
    return {
      ...(model && { model }),
      ...(name && { name }),
      ...(description && { description }),
      ...(instructions && { instructions }),
      ...(metadata && { metadata }),
      ...(role && { role }),
      ...(content && { content }),
      ...(assistantId && { assistant_id: assistantId })
    };
  };

  static _postProcessFinalResponseData = (jobType, responseData) => {
    switch (jobType) {
      case JOB_TYPES.CREATE_ASSISTANT:
      case JOB_TYPES.RETRIEVE_ASSISTANT:
      case JOB_TYPES.MODIFY_ASSISTANT:
        Utils.TrimUnnecessaryDataForResponseData(responseData);
        break;
      case JOB_TYPES.LIST_ASSISTANTS:
        Utils.fromArrayToObjectWithTrimmingData(responseData);
        break;
      case JOB_TYPES.CREATE_THREAD:
      case JOB_TYPES.RETRIEVE_THREAD:
      case JOB_TYPES.MODIFY_THREAD:
        Utils.TrimUnnecessaryDataForResponseData(responseData);
        break;
      case JOB_TYPES.CREATE_MESSAGE:
      case JOB_TYPES.RETRIEVE_MESSAGE:
      case JOB_TYPES.MODIFY_MESSAGE:
        Utils.fromArrayToObjectWithinMessageContent(responseData);
        break;
      case JOB_TYPES.LIST_MESSAGES:
        Utils.fromArrayToObjectWithinMessageList(responseData);
        break;
      case JOB_TYPES.CREATE_RUN:
      case JOB_TYPES.RETRIEVE_RUN:
      case JOB_TYPES.MODIFY_RUN:
        Utils.TrimUnnecessaryDataForResponseData(responseData);
        break;
      case JOB_TYPES.LIST_RUNS:
      case JOB_TYPES.LIST_RUN_STEPS:
        Utils.fromArrayToObjectWithTrimmingData(responseData);
        break;
    }
  };

  static service = async (req, res, next) => {
    try {
      const {
        jobType, model, name, description, instructions, metadata, role, content,
        assistantId, threadId, messageId, runId, stepId,
        limit, order, after, before
      } = REST_MODE ? req.body : AinizeUtils.getDataFromServiceRequest(req);
      const {
        requestMethod,
        getRequestUrlFunction,
        getRequestBodyFunction,
        getRequestQueryFunction
      } = getRequestMaterialsFromJobType(jobType);
      const requestUrl = getRequestUrlFunction({ assistantId, threadId, messageId, runId, stepId });
      const query = (getRequestQueryFunction && getRequestQueryFunction({ limit, order, after, before }));
      const requestBodyFromUserInput = OpenaiAinizeHandler._preprocessUserInputForRequestBody({
        model, name, description, instructions, metadata, role, content, assistantId
      });
      const requestBody = (getRequestBodyFunction && getRequestBodyFunction(requestBodyFromUserInput));
      Utils.printVerboseMessage(`[${Date.now()}][service] 1. retrieve done`);
      const response = await callOpenai({
        method: requestMethod,
        url: requestUrl + (query ? query : ''),
        ...(requestBody && { body: requestBody })   // FIXME(minsu): cannot send empty [], {} body
      });
      Utils.printVerboseMessage(`[${Date.now()}][service] 2. call openai done`);

      if (response?.status === 200) {
        OpenaiAinizeHandler._postProcessFinalResponseData(jobType, response.data);
      } else {
        throw ErrorUtil.setCustomError(response.status, response.message, response);
      }
      Utils.printVerboseMessage(`[${Date.now()}][service] 3. postprocess response done`);

      // TODO(somebody): Need to discuss the amount below 0 when it comes to real service.
      const ainizeResponse = await AinizeUtils.handleRequest({
          req, amount: 0, ainizeStatus: AINIZE_STATUS.SUCCESS, responseData: response.data });
      if (!_.isError(ainizeResponse)) {
        Utils.printVerboseMessage(`[${Date.now()}][service] 4. ainize done`);
        res.status(200).json(Utils.serializeMessage(`${jobType} ok`, response.data));
      } else {
        throw ErrorUtil.setCustomError(500, ainizeResponse.message, ainizeResponse);
      }
    } catch (error) {
      next(ErrorUtil.setCustomError(error.status, error.message, error.errorOriginObject));
    }
  };

  static deposit = async (req, res, next) => {
    try {
      const result = await AinizeUtils.handleDeposit(req);
      Utils.printVerboseMessage(`[${Date.now()}][deposit] deposit done`);
      res.status(200).json(Utils.serializeMessage('deposit ok', result));
    } catch (error) {
      next(ErrorUtil.setCustomError(500, error.message));
    }
  };
}

module.exports = {
  OpenaiAinizeHandler
};
