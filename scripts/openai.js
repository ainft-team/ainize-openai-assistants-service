// NOTE(minsu): derived it from https://github.com/ainize-team/ainize-tutorial-service/blob/main/src/functions/service.ts

const axios = require('axios');

const { OPENAI_API_KEY } = require('../env');

const llmService = async (prompt) => {
  const response = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0.9,
      max_tokens: 521,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + OPENAI_API_KEY,
      },
    },
  );
  console.log(response.data.choices[0].text);
  return response.data.choices[0].text;
}

llmService('hi gpt!');
