const logger = require("pino");
const dayjs = require("dayjs");
const path = require("path");
const logsPath = path.resolve("src", "logs");

const transport = logger.transport({
  targets: [
    {
      target: "pino/file",
      options: { destination: `${logsPath}/server.log` },
      level: process.env.PINO_LOG_LEVEL || "info",
    },
    //@ts-ignore
    {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
  ],
});

const log = logger(
  {
    level: process.env.PINO_LOG_LEVEL || "info",

    timestamp: () => `,"time":"${dayjs().format()}"`,
  },
  transport
);

module.exports = log;
