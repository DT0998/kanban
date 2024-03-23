// use express module
const express = require("express");
const {
  startMetricsServer,
  restResponseTimeHistogram,
} = require("./api/utils/mettrics");
const swaggerDocs = require("./api/utils/swagger");
const logger = require("./api/utils/logger");
const { connect } = require("./api/utils/connect");
const responseTime = require("response-time");
const {
  userRoutes,
  authRoutes,
  premiumRoutes,
} = require("./api/routes/index.routes");
const Moralis = require("moralis").default;
const cors = require("cors");
const { taskPremium } = require("./api/crons/premium/premium.crons");

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
      apiKey: process.env.MORALIS_KEY,
    });
    // server listerning
    app.listen(3000, async () => {
      logger.info(`App is running at http://localhost:3000/swagger`);

      await connect();

      // routes
      userRoutes(app, "api");
      authRoutes(app, "api");
      premiumRoutes(app, "api");

      startMetricsServer();

      swaggerDocs(app, 3000);

      // cron jobs
      taskPremium.start();
    });
  } catch (error) {
    logger.error(`Error: ${error}`);
  }
};

startServer();
