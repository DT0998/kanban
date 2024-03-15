// config server
module.exports = {
  port: 3000,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  moralisKey: process.env.MORALIS_KEY,
  tokenSecret: process.env.TOKEN_SECRET,
  accessTokenLife: process.env.ACCESS_TOKEN_LIFE,
  refreshTokenLife: process.env.REFRESH_TOKEN_LIFE,
};
