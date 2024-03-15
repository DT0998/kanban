const config = require("config");
const jwt = require("jsonwebtoken");

const tokenSecret = config.get("tokenSecret");
const accessTokenLife = config.get("accessTokenLife");
const refreshTokenLife = config.get("refreshTokenLife");

function createAccessToken(data) {
  const { address } = data;
  // Create access token
  const accessToken = jwt.sign({ address }, tokenSecret, {
    expiresIn: accessTokenLife,
  });
  return accessToken;
}

function createRefreshToken(data) {
  const { address } = data;
  // create refresh token
  const refreshToken = jwt.sign({ address }, tokenSecret, {
    expiresIn: refreshTokenLife,
  });
  return refreshToken;
}

module.exports = { createAccessToken, createRefreshToken };
