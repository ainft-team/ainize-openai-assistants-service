require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const AINIZE_PRIVATE_KEY = process.env.AINIZE_PRIVATE_KEY;

if (!OPENAI_API_KEY && !AINIZE_PRIVATE_KEY) {
  throw new Error(`OPENAI_API_KEY(${OPENAI_API_KEY}), AINIZE_PRIVATE_KEY(${AINIZE_PRIVATE_KEY}) is not defined.`);
}

let REST_MODE;
if (!process.env.REST_MODE) {
  REST_MODE = false;
} else {
  REST_MODE = true;
}

module.exports = {
  OPENAI_API_KEY,
  AINIZE_PRIVATE_KEY,
  REST_MODE
};
