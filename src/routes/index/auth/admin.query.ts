import { Router } from "express";
import { controller } from "../../../controllers";

export const adminAuthQuery = (router: Router) => {
  router.post("/auth/admin/login", controller.auth.admin.login);
};
