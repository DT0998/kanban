const logger = require("pino");
const dayjs = require("dayjs");
const path = require("path");
const logsPath = path.resolve("api", "logs");

const transport = logger.transport({
  targets: [
    {
      target: "pino/file",
      options: { destination: `${logsPath}/server.log` },
      level: "info",
    },
    process.env.NODE_ENV === "development" && {
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
