import { generateAuthToken } from "./generateToken.dao";

import { verifyTokenDao } from "./verifyToken.dao";

export const tokenDao = {
  generateAuthToken: generateAuthToken,
  verifyTokenDao: verifyTokenDao,
};
