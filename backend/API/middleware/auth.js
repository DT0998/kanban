const config = require("config");
const jwt = require("jsonwebtoken");
const tokenSecret = config.get("tokenSecret");

const verifyToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.header("Authorization");

    // Check if Authorization header exists
    if (!authorizationHeader) {
      return res.status(401).send({ message: "Authorization header missing" });
    }

    // Check if the Authorization header has the correct format
    if (!authorizationHeader.startsWith("Bearer ")) {
      return res.status(401).send({ message: "Invalid authorization format" });
    }

    const token = authorizationHeader.replace("Bearer ", "");
    console.log("token", token);
    console.log()
    if (!token) return res.status(401).send({ message: "Token not found" });
    jwt.verify(token, tokenSecret);
    next();
  } catch (error) {
    // Handle the error
    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .send({ message: "Not authorized to access this resource" });
    }
    return res.status(401).send({ message: "Token Expired" });
  }
};

module.exports = verifyToken;
