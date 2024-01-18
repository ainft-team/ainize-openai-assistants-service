const { OPENAI_ENDPOINT, OPENAI_ENDPOINT_PATH } = require('../constants');

class OpenaiUrlBuilder {
  static assistantBaseUrl = ([]) => {
    return `${OPENAI_ENDPOINT}${OPENAI_ENDPOINT_PATH.ASSISTANTS}`;
  };

  static assistantBaseWithAssistantIdUrl = ([assistantId]) => {
    return `${OpenaiUrlBuilder.assistantBaseUrl([])}/${assistantId}`;
  };

  static threadBaseUrl = ([]) => {
    return `${OPENAI_ENDPOINT}${OPENAI_ENDPOINT_PATH.THREADS}`;
  };

  static threadBaseWithThreadIdUrl = ([threadId]) => {
    return `${OpenaiUrlBuilder.threadBaseUrl([])}/${threadId}`;
  };

  static messageBaseUrl = ([threadId]) => {
    return `${OpenaiUrlBuilder.threadBaseWithThreadIdUrl([threadId])}${OPENAI_ENDPOINT_PATH.MESSAGES}`;
  };

  static messageBaseWithMessageIdUrl = ([threadId, messageId]) => {
    return `${OpenaiUrlBuilder.messageBaseUrl([threadId])}/${messageId}`;
  };
};

module.exports = {
  OpenaiUrlBuilder
};
