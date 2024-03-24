import { getConnect } from "../utils/connect.js";
import logger from "../utils/logger.js";

const getUserProfile = async (req, res) => {
  const { address } = req.params;
  const querySql = "SELECT * FROM User WHERE address = ? LIMIT 1";
  try {
    const connectionMysql = await getConnect();
    await connectionMysql.query(querySql, [address], function (error, results) {
      if (error) {
        console.error("Error executing SQL query:", error);
        res.status(500).send({ message: "Internal server error" });
        return;
      }
      if (results.length === 0) {
        res.status(404).send({ message: "User not found" });
        return;
      }
      results.forEach((result) => {
        result.premium = Boolean(result.premium);
      });
      res.send({ data: results[0] });
      connectionMysql.release();
    });
  } catch (error) {
    logger.error("Error during getUserProfile:", error);
  }
};

export { getUserProfile };
