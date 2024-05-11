import { CommonRoutesConfig } from "../common/common.routes";
import express from "express";
import indexController from "../../controllers/index.controller/index.controller";
import { adminAuthQuery } from "./auth/admin.query";

export class IndexRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "Index Routes");
    this.app.use("/", this.router);
  }

  configureRoutes(router: express.Router): express.Application {
    router.get("/", indexController.index);
    adminAuthQuery(router);

    return this.app;
  }
}
