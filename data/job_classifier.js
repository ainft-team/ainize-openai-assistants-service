const { OpenaiUrlBuilder } = require('./openai_url_builder');
const { OpenaiRequestBodyBuilder } = require('./openai_request_body_builder');
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
  }
};

module.exports = {
  getRequestMaterialsFromJobType
};
