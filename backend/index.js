// use express module
const express = require("express");
const {
  startMetricsServer,
  restResponseTimeHistogram,
} = require("./API/utils/mettrics");
const swaggerDocs = require("./API/utils/swagger");
const logger = require("./API/utils/logger");
const { connect } = require("./API/utils/connect");
const config = require("config");
const responseTime = require("response-time");
const {
  userRoutes,
  authRoutes,
  premiumRoutes,
} = require("./API/routes/index.routes");
const Moralis = require("moralis").default;
const cors = require("cors");
const { taskPremium } = require("./API/cron/premium.cron");

const port = config.get("port");
const moralisApiKey = config.get("moralisKey");
const app = express();

app.use(express.json());
// config cors
const corsOptions = {
  origin: `*`,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

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

const startServer = async () => {
  try {
    await Moralis.start({
      apiKey: moralisApiKey,
    });
    // server listerning
    app.listen(port, async () => {
      logger.info(`App is running at http://localhost:${port}/swagger`);

      await connect();

      // routes
      userRoutes(app, "api");
      authRoutes(app, "api");
      premiumRoutes(app, "api");

      startMetricsServer();

      swaggerDocs(app, port);

      // cron jobs
      taskPremium.start();
    });
  } catch (error) {
    logger.error(`Error: ${error}`);
  }
};

startServer();