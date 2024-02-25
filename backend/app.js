// use express module
const express = require("express");
const {
  startMetricsServer,
  restResponseTimeHistogram,
} = require("./API/utils/mettrics");
const swaggerDocs = require("./API/utils/swagger");
const logger = require("./API/utils/logger");
const connect = require("./API/utils/connect");
const config = require("config");
const responseTime = require("response-time");
const { userRoutes } = require("./API/routes/index.routes");

const port = config.get("port");
const app = express();

app.use(express.json());

app.use(
  responseTime((req, res, time) => {
    if (req?.route?.path) {
      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode,
        },
        time * 1000
      );
    }
  })
);

// server listerning
app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);

  await connect();

  userRoutes(app, "api");

  startMetricsServer();

  swaggerDocs(app, port);
});
