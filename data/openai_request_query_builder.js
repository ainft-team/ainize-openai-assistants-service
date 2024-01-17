class OpenaiRequestQueryBuilder {
  static makeQuery = ({ limit, order, after, before }) => {
    return Object.entries({ limit, order, after, before })
      .filter(([k, e]) => e)
      .reduce((acc, [k, e]) => {
          return acc + `${k}=${e}&`
        }, "?")
      .slice(0, -1);
  };
};

module.exports = {
  OpenaiRequestQueryBuilder
};
