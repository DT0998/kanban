// use express module
import express from "express";
import {
  startMetricsServer,
  restResponseTimeHistogram,
} from "./api/utils/mettrics.js";
import swaggerDocs from "./api/utils/swagger.js";
import logger from "./api/utils/logger.js";
import responseTime from "response-time";
import {
  userRoutes,
  authRoutes,
  premiumRoutes,
} from "./api/routes/index.routes.js";
import Moralis from "moralis";
import cors from "cors";
import { taskPremium } from "./api/crons/premium/premium.crons.js";
import { renderViews } from "./views/index.js";

const app = express();

app.use(express.json());

// config cors
const corsOptions = {
  origin: ["http://localhost:3000", "https://kanban-api-mocha.vercel.app"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

renderViews(app);

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
      // routes
      userRoutes(app, "api");
      authRoutes(app, "api");
      premiumRoutes(app, "api");

      startMetricsServer(app);

      swaggerDocs(app, 3000);

      // cron jobs
      taskPremium.start();
    });
  } catch (error) {
    logger.error(`Error: ${error}`);
  }
};

startServer();
