const { getRequestMaterialsFromJobType } = require('./job_classifier');
const { callOpenai } = require('./openai_caller');

module.exports = {
  getRequestMaterialsFromJobType,
  callOpenai
};
