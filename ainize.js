const Ainize = require("@ainize-team/ainize-js").default;

const {
  AINIZE_PRIVATE_KEY,
  BLOCKCHAIN_CLUSTER
} = require('./env');
const { BLOCKCHAIN_CLUSTER_NAMES } = require('./constants');

const ainizeHelper = new Ainize(BLOCKCHAIN_CLUSTER === BLOCKCHAIN_CLUSTER_NAMES.TESTNET ? 0 : 1);
// FIXME(minsu): you will be pretty code as soon as ainize stablized.
ainizeHelper.login(AINIZE_PRIVATE_KEY);

module.exports = {
  ainizeHelper
};
