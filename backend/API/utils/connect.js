const logger = require("./logger");
const config = require("config");
const mysql = require("mysql2");

const host = config.get("host");
const user = config.get("user");
const password = config.get("password");
const database = config.get("database");

const connectionMysql = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
});

const connect = async () => {
  try {
    await connectionMysql.connect();
    logger.info("DB connected");
  } catch (error) {
    logger.error("Could not connect to db");
    process.exit(1);
  }
};

module.exports = { connect, connectionMysql };
