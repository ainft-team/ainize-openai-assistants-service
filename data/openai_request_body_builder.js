class OpenaiRequestBodyBuilder {
  static createAssistant = ({
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
};

module.exports = {
  OpenaiRequestBodyBuilder
};
