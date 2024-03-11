const config = require("config");
const jwt = require("jsonwebtoken");
const accessTokenSecret = config.get("accessTokenSecret");

const verifyToken = async (req, res, next) => {
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
  if (!token) return res.sendStatus(401);
  try {
    const decode = jwt.verify(token, accessTokenSecret);
    req.user = decode;
    next();
  } catch (error) {
    // handle the error
    if (error.name === "JsonWebTokenError") {
      res.status(401).send({ message: "Not authorized to access this resource" });
    }
    res.status(401).send({ message: "Token Expired" });
  }
};
module.exports = verifyToken;
