const axios = require('axios');

const { OPENAI_API_KEY } = require('../env');

const callOpenai = async ({ method, url, body }) => {
  const response = await axios({
    method: method,
    url: url,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + OPENAI_API_KEY,
      "OpenAI-Beta": "assistants=v1"
    },
    data: body
  }).catch(error => {
    // TODO(minsu): need to response correctly in this case
    console.log(JSON.parse(JSON.stringify(error)));
  });
  return response;
}

module.exports = {
  callOpenai
};
