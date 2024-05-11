import { Response } from "express";

export const JsonResponse = (
  res: Response,
  body: TServerResponse<unknown, unknown>
) => {
  res.status(body.statusCode);
  res.send({
    statusCode: body.statusCode,
    status: body.status,
    title: body.title,
    message: body.message,
    data: body.data,
    pageData: body.pageData,
    extraData: body.extraData,
  });
};
