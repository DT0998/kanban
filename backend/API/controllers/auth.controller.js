const { connectionMysql } = require("../utils/connect");
const {
  createAccessToken,
  createRefreshToken,
} = require("../services/auth.service");

let refreshTokens = {}; // tao mot object chua nhung refreshTokens

// Function to handle login
async function login(req, res) {
  try {
    const { address } = req.body;
    console.log("address", address);
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
      refreshTokens[refreshToken] = response;
      res.json(response);
    } else {
      // User exists, generate JWT and perform login
      const accessToken = createAccessToken(req.body);
      const refreshToken = createRefreshToken(req.body);
      const response = {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
      refreshTokens[refreshToken] = response;
      res.json(response);
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to check if the user exists in the database
function checkUserExists(address) {
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
}

// Function to register a new user
function register(name, address, dateAdded, premium) {
  return new Promise((resolve, reject) => {
    // Insert user into the database
    const registerQuery =
      "INSERT INTO user (name, address, dateAdded, premium) VALUES (?, ?, ?, ?)";
    connectionMysql.query(
      registerQuery,
      [name, address, dateAdded, premium],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          // User inserted successfully, generate JWT and perform login
          const accessToken = createAccessToken(results.body);
          const refreshToken = createRefreshToken(results.body);
          resolve(accessToken, refreshToken);
        }
      }
    );
  });
}

function refreshToken(req, res) {
  const { refreshToken, address } = req.body;
  // if refresh token exists
  if (refreshToken && refreshToken in refreshTokens) {
    const accessToken = createRefreshToken({ address });
    const response = {
      accessToken: accessToken,
    };
    refreshTokens[refreshToken].accessToken = accessToken;
    res.json(response);
  } else {
    res.status(403).send("Invalid refresh token");
  }
}

function logout(req, res) {
  const { address } = req.body;
}

module.exports = { login, logout, refreshToken };
