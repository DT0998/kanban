import { getConnect } from "../utils/connect.js";
import {
  createAccessToken,
  createRefreshToken,
  checkUserExists,
  addRefreshToken,
  getRefreshToken,
} from "../services/auth.service.js";
import logger from "../utils/logger.js";

// Function to handle login
const login = async (req, res) => {
  try {
    const { address } = req.body;
    // Check if the address is empty
    if (!address) {
      return res.status(400).json({ message: "Address is required" });
    }
    const premium = false;
    const dateAdded = new Date();
    const name = "Unnammed";

    // Check if the user exists in the database
    const userExists = await checkUserExists(address);
    if (!userExists) {
      // If user doesn't exist, register them
      const { accessToken, refreshToken } = await register(
        name,
        address,
        dateAdded,
        premium
      );
      const response = {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
      addRefreshToken(refreshToken, response);
      res.json(response);
    } else {
      // User exists, generate JWT and perform login
      const accessToken = createAccessToken(req.body);
      const refreshToken = createRefreshToken(req.body);
      const response = {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
      addRefreshToken(refreshToken, response);
      res.json(response);
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to register a new user
const register = (name, address, dateAdded, premium) => {
  return new Promise(async (resolve, reject) => {
    // Insert user into the database
    const registerQuery =
      "INSERT INTO User (name, address, dateAdded, premium) VALUES (?, ?, ?, ?)";
    try {
      const connectionMysql = await getConnect();
      await connectionMysql.query(
        registerQuery,
        [name, address, dateAdded, premium],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            // User inserted successfully, generate JWT and perform login
            const accessToken = createAccessToken({ address });
            const refreshToken = createRefreshToken({ address });
            resolve({ accessToken, refreshToken });
          }
        }
      );
    } catch (error) {
      logger.error("Error during registration:", error);
    }
  });
};

const refreshToken = (req, res) => {
  const { refreshToken, address } = req.body;
  // Check if the refresh token exists
  const tokenDetails = getRefreshToken(refreshToken);
  if (tokenDetails) {
    const accessToken = createAccessToken({ address });
    tokenDetails.accessToken = accessToken;
    res.json({ accessToken });
  } else {
    res.status(403).send({ message: "Invalid refresh token" });
  }
};

export { login, refreshToken };
