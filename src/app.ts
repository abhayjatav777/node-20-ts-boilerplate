import express from "express";
import * as http from "http";
import * as expressWinston from "express-winston";
import cors from "cors";
import debug from "debug";
import { CommonRoutesConfig } from "./routes/common/common.routes";
import { Config } from "./config/Config";
import { IndexRoutes } from "./routes/index/index.route";
import { logger, requestLogger } from "./config/logger";
import { AdminRoutes } from "./routes/admin/admin.routes";
import * as dotenv from "dotenv";
import { errorhandler } from "./middleware/async-wrapper/errorHandler";
dotenv.config();

const normalizePort = (val: string) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = normalizePort(process.env.PORT ?? "4000");
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug("app");

// Adding request limiter

// here we are adding middleware to parse all incoming requests as JSON
app.use(express.json());

// here we are adding middleware to allow cross-origin requests
app.use(cors());

// Set content type GLOBALLY for any response.
app.use(function (req, res, next) {
  res.contentType("application/json");
  next();
});

app.set("rootDirectory", __dirname);

// Set File Uploader

// here we are preparing the expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js

// app.use(
//   expressWinston.logger({
//     winstonInstance: requestLogger,
//     statusLevels: true,
//   })
// );

expressWinston.requestWhitelist.push("body");
expressWinston.responseWhitelist.push("body");

// here we are adding the UserRoutes to our array,
// after sending the Express.js application object to have the routes added to our app!

// this is a simple route to make sure everything is working properly
const runningMessage = `Server running at http://localhost:${port}`;
routes.push(new IndexRoutes(app));
routes.push(new AdminRoutes(app));

app.use(errorhandler);

app.use(
  expressWinston.errorLogger({
    winstonInstance: logger,
  })
);

// Configuare Server & Start
new Config()
  .start()
  .then(() => {
    server.listen(port, () => {
      console.log(runningMessage);

      routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName()}`);
      });
      // our only exception to avoiding console.log(), because we
      // always want to know when the server is done starting up
      // console.log(runningMessage);
    });
  })
  .catch((error) => {
    console.log("Config Error ", error);
  });
