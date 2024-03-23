const jwt = require("jsonwebtoken");
const { connectionMysql } = require("../utils/connect");


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
