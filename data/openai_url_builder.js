const { OPENAI_ENDPOINT, OPENAI_ENDPOINT_PATH } = require('../constants');

class OpenaiUrlBuilder {
  static createAssistantUrl = ({ }) => {
    return `${OPENAI_ENDPOINT}${OPENAI_ENDPOINT_PATH.ASSISTANTS}`;
  };
};

module.exports = {
  OpenaiUrlBuilder
};
