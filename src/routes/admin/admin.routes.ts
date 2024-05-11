import { CommonRoutesConfig } from "../common/common.routes";
import express from "express";
import { checkAccess } from "../../middleware/auth/auth.middleware";
import { controller } from "../../controllers";

export class AdminRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "Admin Routes");
    this.app.use("/admin", checkAccess, this.router);
  }

  configureRoutes(router: express.Router): express.Application {
    router.get("/", controller.auth.admin.getProfile);

    return this.app;
  }
}
