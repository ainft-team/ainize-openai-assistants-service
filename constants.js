const JOB_TYPES = Object.freeze({
  CREATE_ASSISTANT: 'create_assistant'
});

const OPENAI_ENDPOINT = 'https://api.openai.com/v1';

const OPENAI_ENDPOINT_PATH = Object.freeze({
  ASSISTANTS: '/assistants',
  THREADS: '/threads',
  MESSAGES: '/messages',
});

const HTTP_REQUEST_METHODS = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT'
});

module.exports = {
  JOB_TYPES,
  OPENAI_ENDPOINT,
  OPENAI_ENDPOINT_PATH,
  HTTP_REQUEST_METHODS
};
