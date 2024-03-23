import logger from "pino";
import dayjs from "dayjs";

let transport;

if (process.env.NODE_ENV === "production") {
  transport = logger.transport({
    targets: [
      {
        target: "pino/file",
        level: "info",
      },
    ],
  });
}

if (process.env.NODE_ENV === "development") {
  transport = logger.transport({
    targets: [
      {
        target: "pino-pretty",
        options: {
          colorize: true,
        },
      },
    ],
  });
}

const log = logger(
  {
    timestamp: () => `,"time":"${dayjs().format()}"`,
  },
  transport
);

export default log;