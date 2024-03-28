const chai = require('chai');
const expect = chai.expect;

const { OpenaiRequestQueryBuilder } = require('../../data/openai_request_query_builder');

describe("openai_request_query_builder", () => {
  const MOCK_BEFORE_TOKEN = 'beforeToken';
  const MOCK_AFTER_TOKEN = 'afterToken';

  describe("makeQuery()", () => {
    it("correctly generates query form", () => {
      expect(OpenaiRequestQueryBuilder.makeQuery({})).to.be.equal("");
      expect(OpenaiRequestQueryBuilder.makeQuery({ limit: 10 }))
        .to.be.equal("?limit=10");
      expect(OpenaiRequestQueryBuilder.makeQuery({ order: 'asc' }))
        .to.be.equal("?order=asc");
      expect(OpenaiRequestQueryBuilder.makeQuery({ before: MOCK_BEFORE_TOKEN }))
        .to.be.equal(`?before=${MOCK_BEFORE_TOKEN}`);
      expect(OpenaiRequestQueryBuilder.makeQuery({ after: MOCK_AFTER_TOKEN }))
        .to.be.equal(`?after=${MOCK_AFTER_TOKEN}`);
      expect(OpenaiRequestQueryBuilder.makeQuery({ limit: 10, order: 'asc' }))
        .to.be.equal("?limit=10&order=asc");
      expect(OpenaiRequestQueryBuilder.makeQuery({
        limit: 10,
        order: 'asc',
        before: MOCK_BEFORE_TOKEN
      }))
        .to.be.equal(`?limit=10&order=asc&before=${MOCK_BEFORE_TOKEN}`);
    });
  });
});
