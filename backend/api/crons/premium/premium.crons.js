import cron from "node-cron";
import { connectionMysql } from "../../utils/connect.js";

// Schedule a job to run every day at midnight
const taskPremium = cron.schedule("0 0 * * *", async () => {
  try {
    const query = `
        UPDATE user
        SET premium = 0
        WHERE address IN (
          SELECT address FROM premium WHERE endDate < NOW()
        )
      `;

    connectionMysql.query(query, (error, _results) => {
      if (error) {
        console.error("Error updating premium status:", error);
        return;
      }
      console.log("Premium status updated successfully");
    });
  } catch (error) {
    console.error("Error during premium expiry check:", error);
  }
});

export { taskPremium };
