import express, { NextFunction } from "express";
import { JsonResponse } from "../../utils/jsonResponse";

export const errorhandler = (
  err: TServerResponse<null, null>,
  _req: express.Request,
  res: express.Response,
  _next: NextFunction
) => {
  const responseBody: TServerResponse<null, null> = {
    status: "error",
    statusCode: 500,
    message: err.message,
    title: err.title,
  };

  return JsonResponse(res, responseBody);
};
