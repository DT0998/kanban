import { getConnect } from "../utils/connect.js";
import { checkUserExists } from "../services/auth.service.js";
import logger from "../utils/logger.js";

const subscribeMonthlyPremium = async (req, res) => {
  const { name, address } = req.body;
  try {
    const userExists = await checkUserExists(address);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }
    if (userExists.premium) {
      return res
        .status(400)
        .json({ message: "User is already subscribed to premium" });
    }
    // If user premium status is false or not set, proceed with subscription
    await updatePremium(address, true);
    await updateHistoryPremium(address, name);

    return res.json({ premium: true });
  } catch (error) {
    console.error("Error during subscribe premium:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updatePremium = async (address, premium) => {
  return new Promise(async (resolve, reject) => {
    const query = "UPDATE user SET premium = ? WHERE address = ?";
    try {
      const connectionMysql = await getConnect();
      await connectionMysql.query(
        query,
        [premium, address],
        (error, _results) => {
          if (error) {
            reject(error);
          } else {
            resolve({ message: "Premium updated successfully" });
            connectionMysql.release();
          }
        }
      );
    } catch (error) {
      logger.error("Error during update premium:", error);
    }
  });
};

const updateHistoryPremium = async (address, name) => {
  return new Promise(async (resolve, reject) => {
    const query =
      "INSERT INTO premium (name, address, startDate, endDate) VALUES (?, ?, ?, ?)";
    const { startDate, endDate } = calculateMonthlyPremium();
    try {
      const connectionMysql = await getConnect();
      connectionMysql.query(
        query,
        [name, address, startDate, endDate],
        (error, _results) => {
          if (error) {
            reject(error);
          } else {
            resolve({ message: "History premium updated successfully" });
            connectionMysql.release();
          }
        }
      );
    } catch (error) {
      logger.error("Error during update history premium:", error);
    }
  });
};

const getHistoryPremium = async (req, res) => {
  const { address } = req.params;
  const title = "Subscribe Premium";
  const query = "SELECT * FROM premium WHERE address = ?";
  try {
    const userExists = await checkUserExists(address);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }
    const connectionMysql = await getConnect();
    connectionMysql.query(query, [address], (error, results) => {
      if (error) {
        console.error("Error during get history:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.length === 0) {
        return res.json({ data: [] });
      }
      const jsonRes = {
        data: results.map((item) => ({
          id: item.id,
          startDate: item.startDate,
          endDate: item.endDate,
          title: title,
        })),
      };
      res.json(jsonRes);
      connectionMysql.release();
    });
  } catch (error) {
    logger.error("Error during get history:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const calculateMonthlyPremium = () => {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(startDate.getMonth() + 1);
  return { startDate, endDate };
};

export { subscribeMonthlyPremium, getHistoryPremium, updatePremium };
