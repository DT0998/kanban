// config server
module.exports = {
  port: 3000,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  moralisKey: process.env.MORALIS_KEY,
  tokenSecret: process.env.TOKEN_SECRET,
  accessTokenLife: process.env.ACCESS_TOKEN_LIFE,
  refreshTokenLife: process.env.REFRESH_TOKEN_LIFE,
  smartcontractAddress: process.env.SMART_CONTRACT_ADDRESS,
  chainId: process.env.CHAIN_ID,
  nodeEnv: process.env.NODE_ENV,
};
