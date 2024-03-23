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
  smartcontractAddress: process.env.SMART_CONTRACT_ADDRESS,
  chainId: process.env.CHAIN_ID,
  pinoLogLevel: process.env.PINO_LOG_LEVEL,
  nodeEnv: process.env.NODE_ENV,
};
