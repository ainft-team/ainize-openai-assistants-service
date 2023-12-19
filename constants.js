const JOB_TYPES = Object.freeze({
  CREATE_ASSISTANT: 'create_assistant'
});

const OPENAI_ENDPOINT = 'https://api.openai.com/v1';

const OPENAI_ENDPOINT_PATH = Object.freeze({
  ASSISTANTS: 'assistants',
  THREADS: 'threads',
  MESSAGES: 'messages',
});

module.exports = {
  JOB_TYPES,
  OPENAI_ENDPOINT,
  OPENAI_ENDPOINT_PATH
};
