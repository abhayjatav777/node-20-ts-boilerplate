import jwt from "jsonwebtoken";
import moment from "moment";

import { logger } from "../../config/logger";
import { models } from "../../models";

export const generateAuthToken = async (data: {
  _id: string;
  name: string;
  userId: string;
  email: string;
}) => {
  try {
    const tokenValue = jwt.sign(
      {
        data: {
          _id: data._id,
          name: data.name,
          email: data.email,
        },
      },
      process.env.JWTTOKEN ?? "",
      { expiresIn: "1 days" }
    );
    const expiresIn = moment().add(1, "days");

    const inserted = await models.token.create({
      userId: data.userId,
      token: tokenValue,
      expiryDate: expiresIn.diff(moment(), "minutes"),
    });
    return inserted;
  } catch (error) {
    logger.error(error);
  }
};
