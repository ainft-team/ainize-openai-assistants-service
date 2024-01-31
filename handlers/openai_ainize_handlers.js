
const { ErrorUtil } = require('./error');
const { Utils } = require('./utils');
const { getRequestMaterialsFromJobType, callOpenai } = require('../data');
const { ainizeAdmin } = require('../ainize');
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
        Utils.TrimUnnecessaryDataForResponseData(responseData);
        break;
      case JOB_TYPES.RETRIEVE_ASSISTANT:
        Utils.TrimUnnecessaryDataForResponseData(responseData);
        break;
      case JOB_TYPES.LIST_ASSISTANTS:
        Utils.fromArrayToObjectWithTrimmingData(responseData);
        break;
      case JOB_TYPES.MODIFY_ASSISTANT:
        Utils.TrimUnnecessaryDataForResponseData(responseData);
        break;
    }
  };

  static service = async (req, res, next) => {
    try {
      const {
        jobType, model, name, description, instructions, metadata, role, content,
        assistantId, threadId, messageId, runId, stepId,
        limit, order, after, before
      } = REST_MODE ? req.body : ainizeAdmin.internal.getDataFromServiceRequest(req).requestData;
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
      const response = await callOpenai({
        method: requestMethod,
        url: requestUrl + (query ? query : ''),
        ...(requestBody && { body: requestBody })   // FIXME(minsu): cannot send empty [], {} body
      });

      if (response?.status === 200) {
        OpenaiAinizeHandler._postProcessFinalResponseData(jobType, response.data);
      } else {
        throw ErrorUtil.setCustomError(response.status, response.message);
      }

      // FIXME(minsu): this is tempolar approach.
      if (!REST_MODE) await ainizeAdmin.internal.handleRequest(req, 0, AINIZE_STATUS.SUCCESS, response.data);
      res.status(200).json(Utils.serializeMessage(`${jobType} ok`, response.data));
    } catch (error) {
      next(ErrorUtil.setCustomError(error.status, error.message));
    }
  };

  static deposit = (req, res, next) => {
    try {
      res.status(200).json(Utils.serializeMessage('ok', { hello: 'world' }));
    } catch (error) {
      throw ErrorUtil.setCustomError(500, error);
    }
  };
}

module.exports = {
  OpenaiAinizeHandler
};
