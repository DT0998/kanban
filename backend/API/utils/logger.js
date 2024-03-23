const logger = require("pino");
const dayjs = require("dayjs");
const path = require("path");
const config = require("config");
const logLevel = config.get("pinoLogLevel");
const nodeEnv = config.get("nodeEnv");
const logsPath = path.resolve("api", "logs");

const transport = logger.transport({
  targets: [
    {
      target: "pino/file",
      options: { destination: `${logsPath}/server.log` },
      level: logLevel || "info",
    },
    //@ts-ignore
    nodeEnv !== "production" && {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
  ],
});

const log = logger(
  {
    level: logLevel || "info",
    timestamp: () => `,"time":"${dayjs().format()}"`,
  },
  transport
);

module.exports = log;
