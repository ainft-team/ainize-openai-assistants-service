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

  static createMessage = ({ role = 'user', content = '', file_ids, metadata }) => {
    return {
      role,
      content,
      ...(file_ids && { file_ids }),
      ...(metadata && { metadata })
    };
  };

  static createThread = ({ message, metadata }) => {
    return {
      ...(message && { message }),
      ...(metadata && { metadata })
    };
  };

  static modifyThread = ({ metadata }) => {
    return {
      ...(metadata && { metadata })
    };
  };

  static modifyMessage = ({ metadata }) => {
    return {
      ...(metadata && { metadata })
    };
  };

  static createRun = ({ assistant_id, model, instructions, additional_instructions, tools, metadata }) => {
    return {
      assistant_id,
      ...(model && { model }),
      ...(instructions && { instructions }),
      ...(additional_instructions && { additional_instructions }),
      ...(tools && { tools }),
      ...(metadata && { metadata }),
    };
  };

  static modifyRun = ({ metadata }) => {
    return {
      ...(metadata && { metadata })
    };
  };
};

module.exports = {
  OpenaiRequestBodyBuilder
};
