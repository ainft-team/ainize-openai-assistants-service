const { RESPONSE_STATUS } = require("@ainize-team/ainize-js/dist/types/type");

const JOB_TYPES = Object.freeze({
  CREATE_ASSISTANT: 'create_assistant',
  RETRIEVE_ASSISTANT: 'retrieve_assistant',
  MODIFY_ASSISTANT: 'modify_assistant',
  DELETE_ASSISTANT: 'delete_assistant',
  LIST_ASSISTANTS: 'list_assistants'
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

const AINIZE_STATUS = Object.freeze({
  SUCCESS: RESPONSE_STATUS.SUCCESS,
  FAILURE: RESPONSE_STATUS.FAIL
})

module.exports = {
  JOB_TYPES,
  OPENAI_ENDPOINT,
  OPENAI_ENDPOINT_PATH,
  HTTP_REQUEST_METHODS,
  AINIZE_STATUS
};
