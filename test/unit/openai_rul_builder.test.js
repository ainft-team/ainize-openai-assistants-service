const chai = require('chai');
const expect = chai.expect;

const { OpenaiUrlBuilder } = require('../../data/openai_url_builder');

describe("Openai_url_builder", () => {
  const OPENAI_ENDPOINT = 'https://api.openai.com/v1';
  
  describe("assistantBaseUrl()", () => {
    it("generates assistant base url without ", () => {
      expect(OpenaiUrlBuilder.assistantBaseUrl({})).to.be.equal(`${OPENAI_ENDPOINT}/assistants`)
    })
  });
});
