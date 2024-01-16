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

  static modifyAssistant = ({
    model,
    name,
    description,
    instructions,
    tools = [],
    file_ids = [],
    metadata = {}
  }) => {
    return {
      ...(model && { model }),
      ...(name && { name }),
      ...(description && { description }),
      ...(instructions && { instructions }),
      tools,
      file_ids,
      metadata
    };
  };

  static createMessage = ({
    role = 'user',
    content = '',
    file_ids = [],
    metadata = {}
  }) => {
    return {
      ...(role && { role }),
      ...(content && { content }),
      file_ids,
      metadata
    };
  };

  static createThread = ({ message, metadata }) => {
    return {
      ...(message && { message }),
      ...(metadata && { metadata })
    };
  };

  static modifyThread = ({ metadata = {} }) => {
    return {
      ...(metadata && { metadata })
    };
  };
};

module.exports = {
  OpenaiRequestBodyBuilder
};
