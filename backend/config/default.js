// config server
module.exports = {
  port: 1337,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  jwtKey: process.env.JWT_KEY,
  moralisKey: process.env.MORALIS_KEY,
};
