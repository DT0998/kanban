const logger = require("./logger");
const config = require("config");
const mysql = require("mysql2");

const connectionMysql = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
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
