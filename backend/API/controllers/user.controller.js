const { connectionMysql } = require("../utils/connect");

function getUser(_req, res) {
  const querySql = "SELECT * FROM user";
  connectionMysql.query(querySql, function (error, results) {
    if (error) throw error;
    // Convert premium field to boolean
    const convertedResults = results.map((result) => {
      result.premium = Boolean(result.premium);
      return result;
    });
    res.send({ data: convertedResults, total: results.length });
  });
}

module.exports = { getUser };
