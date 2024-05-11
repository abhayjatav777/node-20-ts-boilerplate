import { getProfile } from "./getProfile";
import { loginAdmin } from "./login";

export const adminAuthController = {
  login: loginAdmin,
  getProfile: getProfile,
};
