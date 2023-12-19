const { JOB_TYPES } = require('../constants');

class OpenaiRequestBodyBuilder {
  static _createAssistant = ({
    model = 'gpt-4',
    name = null,
    description = null,
    instructions = null,
    tools = [],
    file_ids = [],
    metadata = {}
  }) => {
    return { model, name, description, instructions, tools, file_ids, metadata };
  };

  static getRequestBodyFunction = (jobType) => {
    switch (jobType) {
      case JOB_TYPES.CREATE_ASSISTANT:
        return OpenaiRequestBodyBuilder._createAssistant;
    }
  }
};

module.exports = {
  OpenaiRequestBodyBuilder
};
