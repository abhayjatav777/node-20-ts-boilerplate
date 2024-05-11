import { NextFunction, Request, Response } from "express";

import { JsonResponse } from "../../../utils/jsonResponse";
import { asyncWrapper } from "../../../middleware/async-wrapper/asyncWrapper.middleware";
import { ErrorResponse } from "../../../middleware/async-wrapper/errorResponse";
import { dao } from "../../../dao";

export const getProfile = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.userId;

    const user = await dao.admin.findAdminById(userId);
    if (user) {
      return JsonResponse(res, {
        statusCode: 200,
        status: "success",
        title: "Profile founded",
        message: "profile founded successfully",
        data: user,
      });
    } else {
      return next(
        new ErrorResponse({
          statusCode: 400,
          title: "Error",
          message: "profile not founded successfully",
        })
      );
    }
  }
);
