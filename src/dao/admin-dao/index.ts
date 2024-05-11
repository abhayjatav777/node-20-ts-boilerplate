import { getAdminByEmail } from "./getAdminbyEmail.dao";
import { getAdminById } from "./getAdminById.dao";

export const adminDao = {
  findAdminByEmail: getAdminByEmail,
  findAdminById: getAdminById,
};
