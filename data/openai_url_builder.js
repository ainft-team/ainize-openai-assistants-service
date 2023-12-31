const { OPENAI_ENDPOINT, OPENAI_ENDPOINT_PATH } = require('../constants');

class OpenaiUrlBuilder {
  static assistantBaseUrl = ([]) => {
    return `${OPENAI_ENDPOINT}${OPENAI_ENDPOINT_PATH.ASSISTANTS}`;
  };

  static assistantBaseWithAssistantIdUrl = ([assistantId]) => {
    return `${OPENAI_ENDPOINT}${OPENAI_ENDPOINT_PATH.ASSISTANTS}/${assistantId}`;
  }
};

module.exports = {
  OpenaiUrlBuilder
};
