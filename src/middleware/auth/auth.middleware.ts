import { NextFunction, Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import jwt from "jsonwebtoken";
import { dao } from "../../dao";

declare module "jsonwebtoken" {
  export interface MyJWTPayload extends jwt.JwtPayload {
    data: {
      _id: string;
      mobile: string;
      userId: string;
      role: string;
    };
    iat: number;
    exp: number;
  }
}

export const checkAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers[`authorization`];

  if (!token) {
    return JsonResponse(res, {
      statusCode: 401,
      status: "error",
      title: "Authentication Failed",
      message: "No Auth Header Available",
    });
  }

  try {
    const verified = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWTTOKEN ?? ""
    );

    if (!verified) {
      return JsonResponse(res, {
        statusCode: 401,
        status: "error",
        title: "Authentication Error",
        message: "Token is not valid",
      });
    }

    const tokenVerified = await dao.token.verifyTokenDao(
      token.replace("Bearer ", "")
    );

    if (!tokenVerified) {
      return JsonResponse(res, {
        statusCode: 401,
        status: "error",
        title: "Authentication Error",
        message: "Token is not valid",
      });
    } else {
      res.locals.userId = tokenVerified.userId;
      next();
    }
  } catch (error: unknown) {
    const newError = error as { message: string };

    return JsonResponse(res, {
      statusCode: 401,
      status: "error",
      title: "Authentication Error",
      message: newError.message,
    });
  }
};
