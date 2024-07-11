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
import welcomeRouter from "./views/index.js";

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());

app.use(
  cors({
    origin: [
      `http://localhost:${PORT}`,
      "https://kanban-api-uez5.onrender.com",
      "http://localhost:4200",
      "https://kanban-dapp.vercel.app",
    ],
  })
);


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

const startServer = () => {
  try {
    // server listerning
    app.listen(PORT, async () => {
      logger.info(`App is running at ${PORT}`);
      // routes
          await Moralis.start({
      apiKey: process.env.MORALIS_KEY,
    });
      app.use("/", welcomeRouter);
      userRoutes(app, "api");
      authRoutes(app, "api");
      premiumRoutes(app, "api");

      startMetricsServer(app, PORT);

      swaggerDocs(app, PORT);

      // cron jobs
      taskPremium.start();
    });
  } catch (error) {
    logger.error(`Error: ${error}`);
  }
};

startServer();
