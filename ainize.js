const Ainize = require("@ainize-team/ainize-js").default;

const { AINIZE_PRIVATE_KEY } = require('./env');

const ainizeHelper = new Ainize(0);
// FIXME(minsu): you will be pretty code as soon as ainize stablized.
ainizeHelper.login(AINIZE_PRIVATE_KEY);

module.exports = {
  ainizeHelper
};
