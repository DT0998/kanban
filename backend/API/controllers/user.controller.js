const { connectionMysql } = require("../utils/connect");

function getUserProfile(req, res) {
  const { address } = req.params;
  // Modify the SQL query to include a WHERE clause filtering by address
  const querySql = "SELECT * FROM user WHERE address = ? LIMIT 1"; // Add LIMIT 1 to only return one row
  // Pass the address as a parameter to prevent SQL injection
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
    // Convert premium field to boolean for each result
    results.forEach((result) => {
      result.premium = Boolean(result.premium);
    });
    // Send back only the first result (if exists)
    if (results.length > 0) {
      res.send({ data: results[0] });
    } else {
      res.status(404).send({ error: "User not found" });
    }
  });
}

module.exports = { getUserProfile };
