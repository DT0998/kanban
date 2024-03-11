const config = require("config");
const jwt = require("jsonwebtoken");

const accessTokenSecret = config.get("accessTokenSecret");
const accessTokenLife = config.get("accessTokenLife");
const refreshTokenSecret = config.get("refreshTokenSecret");
const refreshTokenLife = config.get("refreshTokenLife");

function createAccessToken(data) {
  const { name, address } = data;
  // Create access token
  const accessToken = jwt.sign({ name, address }, accessTokenSecret, {
    expiresIn: accessTokenLife,
  });
  return accessToken;
}

function createRefreshToken(data) {
  const { name, address } = data;
  const refreshToken = jwt.sign({ name, address }, refreshTokenSecret, {
    expiresIn: refreshTokenLife,
  });
  return refreshToken;
}

module.exports = { createAccessToken, createRefreshToken };
