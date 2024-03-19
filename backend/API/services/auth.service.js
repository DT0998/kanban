const config = require("config");
const jwt = require("jsonwebtoken");
const { connectionMysql } = require("../utils/connect");

const tokenSecret = config.get("tokenSecret");
const accessTokenLife = config.get("accessTokenLife");
const refreshTokenLife = config.get("refreshTokenLife");

function createAccessToken({ address }) {
  // Create access token
  const accessToken = jwt.sign({ address }, tokenSecret, {
    expiresIn: accessTokenLife,
  });
  return accessToken;
}

function createRefreshToken({ address }) {
  // create refresh token
  const refreshToken = jwt.sign({ address }, tokenSecret, {
    expiresIn: refreshTokenLife,
  });
  return refreshToken;
}

// Function to check if the user exists in the database
const checkUserExists = (address) => {
  return new Promise((resolve, reject) => {
    const checkUserQuery = "SELECT * FROM user WHERE address = ?";
    connectionMysql.query(checkUserQuery, [address], (error, results) => {
      if (error) {
        reject(error);
      } else {
        // Check if any rows were returned
        resolve(results.length > 0);
      }
    });
  });
};

module.exports = { createAccessToken, createRefreshToken, checkUserExists };
