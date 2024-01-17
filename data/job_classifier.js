const { OpenaiUrlBuilder } = require('./openai_url_builder');
const { OpenaiRequestBodyBuilder } = require('./openai_request_body_builder');
const { OpenaiRequestQueryBuilder } = require('./openai_request_query_builder');
const {
  JOB_TYPES,
  HTTP_REQUEST_METHODS
} = require('../constants');

const getRequestMaterialsFromJobType = (jobType) => {
  switch (jobType) {
    case JOB_TYPES.CREATE_ASSISTANT:
      return {
        requestMethod: HTTP_REQUEST_METHODS.POST,
        getRequestUrlFunction: OpenaiUrlBuilder.assistantBaseUrl,
        getRequestBodyFunction: OpenaiRequestBodyBuilder.createAssistant
      };
    case JOB_TYPES.RETRIEVE_ASSISTANT:
      return {
        requestMethod: HTTP_REQUEST_METHODS.GET,
        getRequestUrlFunction: OpenaiUrlBuilder.assistantBaseWithAssistantIdUrl,
      };
    case JOB_TYPES.MODIFY_ASSISTANT:
      return {
        requestMethod: HTTP_REQUEST_METHODS.POST,
        getRequestUrlFunction: OpenaiUrlBuilder.assistantBaseWithAssistantIdUrl,
        getRequestBodyFunction: OpenaiRequestBodyBuilder.modifyAssistant
      };
    case JOB_TYPES.DELETE_ASSISTANT:
      return {
        requestMethod: HTTP_REQUEST_METHODS.DELETE,
        getRequestUrlFunction: OpenaiUrlBuilder.assistantBaseWithAssistantIdUrl,
      };
    case JOB_TYPES.LIST_ASSISTANTS:
      return {
        requestMethod: HTTP_REQUEST_METHODS.GET,
        getRequestUrlFunction: OpenaiUrlBuilder.assistantBaseUrl,
        getRequestQueryFunction: OpenaiRequestQueryBuilder.makeQuery,
      };
    case JOB_TYPES.CREATE_THREAD:
      return {
        requestMethod: HTTP_REQUEST_METHODS.POST,
        getRequestUrlFunction: OpenaiUrlBuilder.threadBaseUrl,
        getRequestBodyFunction: OpenaiRequestBodyBuilder.createThread
      };
    case JOB_TYPES.RETRIEVE_THREAD:
      return {
        requestMethod: HTTP_REQUEST_METHODS.GET,
        getRequestUrlFunction: OpenaiUrlBuilder.threadBaseWithThreadIdUrl
      };
    case JOB_TYPES.MODIFY_THREAD:
      return {
        requestMethod: HTTP_REQUEST_METHODS.POST,
        getRequestUrlFunction: OpenaiUrlBuilder.threadBaseWithThreadIdUrl,
        getRequestBodyFunction: OpenaiRequestBodyBuilder.modifyThread,
      };
    case JOB_TYPES.DELETE_THREAD:
      return {
        requestMethod: HTTP_REQUEST_METHODS.DELETE,
        getRequestUrlFunction: OpenaiUrlBuilder.threadBaseWithThreadIdUrl,
      };
    case JOB_TYPES.CREATE_MESSAGE:
      return {
        requestMethod: HTTP_REQUEST_METHODS.POST,
        getRequestUrlFunction: OpenaiUrlBuilder.messageBaseUrl,
        getRequestBodyFunction: OpenaiRequestBodyBuilder.createMessage
      };
  }
};

module.exports = {
  getRequestMaterialsFromJobType
};
