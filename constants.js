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
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put'
});

module.exports = {
  JOB_TYPES,
  OPENAI_ENDPOINT,
  OPENAI_ENDPOINT_PATH,
  HTTP_REQUEST_METHODS
};
