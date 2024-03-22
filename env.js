require('dotenv').config();

const { BLOCKCHAIN_CLUSTER_NAMES } = require('./constants');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const AINIZE_PRIVATE_KEY = process.env.AINIZE_PRIVATE_KEY;
const SLACK_WEBHOOK_TOKEN = process.env.SLACK_WEBHOOK_TOKEN;
const SLACK_CHANNEL_NAME = process.env.SLACK_CHANNEL_NAME;
const BLOCKCHAIN_CLUSTER = process.env.BLOCKCHAIN_CLUSTER;

if (!OPENAI_API_KEY && !AINIZE_PRIVATE_KEY) {
  throw new Error(`OPENAI_API_KEY(${OPENAI_API_KEY}) and AINIZE_PRIVATE_KEY(${AINIZE_PRIVATE_KEY}) are not defined.`);
}

if (!SLACK_WEBHOOK_TOKEN && !SLACK_CHANNEL_NAME) {
  throw new Error(`SLACK_WEBHOOK_TOKEN(${SLACK_WEBHOOK_TOKEN}) and SLACK_CHANNEL_NAME(${SLACK_CHANNEL_NAME}) are not defined.`);
}

if (![BLOCKCHAIN_CLUSTER_NAMES.MAINNET, BLOCKCHAIN_CLUSTER_NAMES.TESTNET].includes(BLOCKCHAIN_CLUSTER)) {
  throw new Error(`given BLOCKCHAIN_CLUSTER must be either mainnet or testnet`);
}

let REST_MODE;
if (!process.env.REST_MODE) {
  REST_MODE = false;
} else {
  REST_MODE = true;
}

let VERBOSE;
if (!process.env.VERBOSE) {
  VERBOSE = false;
} else {
  VERBOSE = true;
}

module.exports = {
  OPENAI_API_KEY,
  AINIZE_PRIVATE_KEY,
  BLOCKCHAIN_CLUSTER,
  REST_MODE,
  VERBOSE,
  SLACK_WEBHOOK_TOKEN,
  SLACK_CHANNEL_NAME
};
