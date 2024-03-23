const logger = require("pino");
const dayjs = require("dayjs");
const path = require("path");
const config = require("config");
const pinoLogLevel = config.get("pinoLogLevel");
const nodeEnv = config.get("nodeEnv");
console.log("nodeEnv", nodeEnv);
const logsPath = path.resolve("api", "logs");

const transport = logger.transport({
  targets: [
    {
      target: "pino/file",
      options: { destination: `${logsPath}/server.log` },
      level: pinoLogLevel || "info",
    },
    nodeEnv === "development" && {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
  ],
});

const log = logger(
  {
    timestamp: () => `,"time":"${dayjs().format()}"`,
  },
  transport
);

module.exports = log;
