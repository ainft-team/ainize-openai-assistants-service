const { OPENAI_ENDPOINT, OPENAI_ENDPOINT_PATH } = require('../constants');

class OpenaiUrlBuilder {
  static assistantBaseUrl = ({ }) => {
    return `${OPENAI_ENDPOINT}${OPENAI_ENDPOINT_PATH.ASSISTANTS}`;
  };

  static assistantBaseWithAssistantIdUrl = ({ assistantId }) => {
    return `${OpenaiUrlBuilder.assistantBaseUrl({ })}/${assistantId}`;
  };

  static threadBaseUrl = ({ }) => {
    return `${OPENAI_ENDPOINT}${OPENAI_ENDPOINT_PATH.THREADS}`;
  };

  static threadBaseWithThreadIdUrl = ({ threadId }) => {
    return `${OpenaiUrlBuilder.threadBaseUrl({})}/${threadId}`;
  };

  static messageBaseUrl = ({ threadId }) => {
    return `${OpenaiUrlBuilder.threadBaseWithThreadIdUrl({ threadId })}${OPENAI_ENDPOINT_PATH.MESSAGES}`;
  };

  static messageBaseWithMessageIdUrl = ({ threadId, messageId }) => {
    return `${OpenaiUrlBuilder.messageBaseUrl([threadId])}/${messageId}`;
  };

  static runBaseUrl = ({ threadId }) => {
    return `${OpenaiUrlBuilder.threadBaseWithThreadIdUrl({ threadId })}${OPENAI_ENDPOINT_PATH.RUNS}`;
  };

  static runBaseUrlWithRunIdUrl = ({ threadId, runId }) => {
    return `${OpenaiUrlBuilder.runBaseUrl({ threadId })}/${runId}`;
  };

  static runBaseUrlWithRunIdStepsUrl = ({ threadId, runId }) => {
    return `${OpenaiUrlBuilder.runBaseUrl({ threadId })}/${runId}${OPENAI_ENDPOINT_PATH.STEPS}`;
  };

  static runBaseUrlWithRunIdStepIdUrl = ({ threadId, runId, stepId }) => {
    return `${OpenaiUrlBuilder.runBaseUrl({ threadId })}/${runId}${OPENAI_ENDPOINT_PATH.STEPS}/${stepId}`;
  };

  static runBaseUrlWithRunIdCancelUrl = ({ threadId, runId }) => {
    return `${OpenaiUrlBuilder.runBaseUrl({ threadId })}/${runId}${OPENAI_ENDPOINT_PATH.CANCEL}`;
  }
};

module.exports = {
  OpenaiUrlBuilder
};
