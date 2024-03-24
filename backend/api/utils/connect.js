import logger from "./logger.js";
import mysql from "mysql2";

const connectionMysqlPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0,
});

const getConnect = () => {
  return new Promise((resolve, reject) => {
    connectionMysqlPool.getConnection((err, connection) => {
      if (err) {
        logger.error(err);
        reject(err);
      } else {
        logger.info("Connected to MySQL");
        resolve(connection);
      }
    });
  });
};

export { getConnect };
