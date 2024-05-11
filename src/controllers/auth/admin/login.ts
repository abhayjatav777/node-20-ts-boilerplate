import { NextFunction, Request, Response } from "express";

import { JsonResponse } from "../../../utils/jsonResponse";
import bcrypt from "bcryptjs";
import { asyncWrapper } from "../../../middleware/async-wrapper/asyncWrapper.middleware";
import { ErrorResponse } from "../../../middleware/async-wrapper/errorResponse";
import { dao } from "../../../dao";

export const loginAdmin = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    const admin = await dao.admin.findAdminByEmail(username);

    if (!admin) {
      return next(
        new ErrorResponse({
          statusCode: 400,
          title: "Error",
          message: "User not found with this username",
        })
      );
    }

    const passwordVerified = bcrypt.compareSync(password, admin.password);

    if (!passwordVerified) {
      return next(
        new ErrorResponse({
          statusCode: 400,
          title: "Error",
          message: "Please enter a correct password",
        })
      );
    }

    if (!admin.active) {
      return next(
        new ErrorResponse({
          statusCode: 400,
          title: "Error",
          message: "user not active, please contact to a developer",
        })
      );
    }

    const token = await dao.token.generateAuthToken({
      _id: admin._id,
      email: admin.username,
      name: admin.username,
      userId: admin._id,
    });

    if (token) {
      return JsonResponse(res, {
        statusCode: 201,
        status: "success",
        title: "Success",
        message: "Logged in successfully",
        data: {
          token: token.token,
          expiresIn: token.expiryDate,
          authUserState: {
            username: admin.username,
            role: admin.role,
          },
        },
      });
    } else {
      return next(
        new ErrorResponse({
          statusCode: 400,
          title: "Error",
          message: "something went wrong. try again later",
        })
      );
    }
  }
);
