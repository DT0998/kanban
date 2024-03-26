import jwt from "jsonwebtoken";
import { getConnect } from "../utils/connect.js";
import logger from "../utils/logger.js";

function createAccessToken({ address }) {
  // Create access token
  const accessToken = jwt.sign({ address }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });
  return accessToken;
}

function createRefreshToken({ address }) {
  // create refresh token
  const refreshToken = jwt.sign({ address }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_LIFE,
  });
  return refreshToken;
}

// Function to check if the user exists in the database
const checkUserExists = async (address) => {
  const query = "SELECT * FROM user WHERE address = ?";
  return new Promise(async (resolve, reject) => {
    try {
      const connectionMysql = await getConnect();
      await connectionMysql.query(query, [address], (error, rows) => {
        if (error) {
          reject(error);
        } else {
          resolve(rows.length > 0);
        }
      });
    } catch (error) {
      logger.error("Error during check user exists:", error);
    }
  });
};

const refreshTokens = {};

const addRefreshToken = (refreshToken, response) => {
  refreshTokens[refreshToken] = response;
};

const getRefreshToken = (refreshToken) => {
  return refreshTokens[refreshToken];
};

export {
  createAccessToken,
  createRefreshToken,
  checkUserExists,
  addRefreshToken,
  getRefreshToken,
};
