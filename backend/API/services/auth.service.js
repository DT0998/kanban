const config = require("config");
const jwt = require("jsonwebtoken");

const accessTokenSecret = config.get("accessTokenSecret");
const accessTokenLife = config.get("accessTokenLife");
const refreshTokenSecret = config.get("refreshTokenSecret");
const refreshTokenLife = config.get("refreshTokenLife");

function createAccessToken(data) {
  const { address } = data;
  // Create access token
  const accessToken = jwt.sign({ address }, accessTokenSecret, {
    expiresIn: accessTokenLife,
  });
  return accessToken;
}

function createRefreshToken(data) {
  const { address } = data;
  const refreshToken = jwt.sign({ address }, refreshTokenSecret, {
    expiresIn: refreshTokenLife,
  });
  return refreshToken;
}

module.exports = { createAccessToken, createRefreshToken };
