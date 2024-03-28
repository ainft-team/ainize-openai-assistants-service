const chai = require('chai');
const expect = chai.expect;

const { OpenaiUrlBuilder } = require('../../data/openai_url_builder');

describe("Openai_url_builder", () => {
  const OPENAI_ENDPOINT = 'https://api.openai.com/v1';
  const MOCK_ASSISTANT_ID = 'assistantId';
  const MOCK_THREAD_ID = 'threadId';
  const MOCK_MESSAGE_ID = 'messageId';
  
  describe("assistantBaseUrl()", () => {
    it("generates assistant base url without path", () => {
      expect(OpenaiUrlBuilder.assistantBaseUrl({})).to.be.equal(`${OPENAI_ENDPOINT}/assistants`)
    });
  });

  describe("assistantBaseWithAssistantIdUrl()", () => {
    it("generates the url with assistant id path", () => {
      expect(OpenaiUrlBuilder.assistantBaseWithAssistantIdUrl({ assistantId: MOCK_ASSISTANT_ID}))
      .to.be.equal(`${OPENAI_ENDPOINT}/assistants/${MOCK_ASSISTANT_ID}`);
    });
  });

  describe("threadBaseUrl()", () => {
    it("generates thread base url without path", () => {
      expect(OpenaiUrlBuilder.threadBaseUrl({})).to.be.equal(`${OPENAI_ENDPOINT}/threads`);
    });
  });

  describe("threadBaseWithThreadIdUrl()", () => {
    it("generates the url with thread id path", () => {
      expect(OpenaiUrlBuilder.threadBaseWithThreadIdUrl({ threadId: MOCK_THREAD_ID }))
      .to.be.equal(`${OPENAI_ENDPOINT}/threads/${MOCK_THREAD_ID}`);
    });
  });

  describe("messageBaseUrl()", () => {
    it("generates thread base url with message path", () => {
      expect(OpenaiUrlBuilder.messageBaseUrl({ threadId: MOCK_THREAD_ID }))
      .to.be.equal(`${OPENAI_ENDPOINT}/threads/${MOCK_THREAD_ID}/messages`);
    });
  });

  describe("messageBaseWithMessageIdUrl()", () => {
    it("generates thread and message base url with message id path", () => {
      expect(OpenaiUrlBuilder.messageBaseWithMessageIdUrl({
        threadId: MOCK_THREAD_ID,
        messageId: MOCK_MESSAGE_ID
      }))
      .to.be.equal(`${OPENAI_ENDPOINT}/threads/${MOCK_THREAD_ID}/messages/${MOCK_MESSAGE_ID}`);
    });
  });
});
