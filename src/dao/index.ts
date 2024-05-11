import { adminDao } from "./admin-dao";
import { tokenDao } from "./token-dao";

export const dao = {
  admin: adminDao,
  token: tokenDao,
};
