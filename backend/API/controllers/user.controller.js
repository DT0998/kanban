const { connectionMysql } = require("../utils/connect");

const getUserProfile = (req, res) => {
  const { address } = req.params;
  const querySql = "SELECT * FROM user WHERE address = ? LIMIT 1";
  connectionMysql.query(querySql, [address], function (error, results) {
    if (error) {
      console.error("Error executing SQL query:", error);
      res.status(500).send({ error: "Internal server error" });
      return;
    }
    if (results.length === 0) {
      res.status(404).send({ error: "User not found" });
      return;
    }
    results.forEach((result) => {
      result.premium = Boolean(result.premium);
    });
    res.send({ data: results[0] });
  });
};

module.exports = { getUserProfile };
