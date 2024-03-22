const { RESPONSE_STATUS } = require("@ainize-team/ainize-js/dist/types/type");

const JOB_TYPES = Object.freeze({
  CREATE_ASSISTANT: 'create_assistant',
  RETRIEVE_ASSISTANT: 'retrieve_assistant',
  MODIFY_ASSISTANT: 'modify_assistant',
  DELETE_ASSISTANT: 'delete_assistant',
  LIST_ASSISTANTS: 'list_assistants',
  CREATE_THREAD: 'create_thread',
  RETRIEVE_THREAD: 'retrieve_thread',
  MODIFY_THREAD: 'modify_thread',
  DELETE_THREAD: 'delete_thread',
  CREATE_MESSAGE: 'create_message',
  LIST_MESSAGES: 'list_messages',
  RETRIEVE_MESSAGE: 'retrieve_message',
  MODIFY_MESSAGE: 'modify_message',
  CREATE_RUN: 'create_run',
  LIST_RUNS: 'list_runs',
  LIST_RUN_STEPS: 'list_run_steps',
  RETRIEVE_RUN: 'retrieve_run',
  RETRIEVE_RUN_STEP: 'retrieve_run_step',
  MODIFY_RUN: 'modify_run',
  CANCEL_RUN: 'cancel_run'
});

const OPENAI_ENDPOINT = 'https://api.openai.com/v1';

const OPENAI_ENDPOINT_PATH = Object.freeze({
  ASSISTANTS: '/assistants',
  THREADS: '/threads',
  MESSAGES: '/messages',
  RUNS: '/runs',
  STEPS: '/steps',
  CANCEL: '/cancel'
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
});

const BLOCKCHAIN_CLUSTER_NAMES = Object.freeze({
  MAINNET: 'mainnet',
  TESTNET: 'testnet'
});

module.exports = {
  JOB_TYPES,
  OPENAI_ENDPOINT,
  OPENAI_ENDPOINT_PATH,
  HTTP_REQUEST_METHODS,
  AINIZE_STATUS,
  BLOCKCHAIN_CLUSTER_NAMES
};
