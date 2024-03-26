import cron from "node-cron";
import { getConnect } from "../../utils/connect.js";

// Schedule a job to run every day at midnight
const taskPremium = cron.schedule("0 0 * * *", async () => {
  const query = `
      UPDATE User
      SET Premium = 0
      WHERE address IN (
        SELECT address FROM premium WHERE endDate < NOW()
      )
    `;
  try {
    const connectionMysql = await getConnect();
    await connectionMysql.query(query, (error, _results) => {
      if (error) {
        logger.error("Error updating premium status:", error);
        return;
      }
      logger.info("Premium status updated successfully");
    });
  } catch (error) {
    logger.error("Error during premium expiry check:", error);
  }
});

export { taskPremium };
