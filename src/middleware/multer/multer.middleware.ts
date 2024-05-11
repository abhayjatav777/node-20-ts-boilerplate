import { NextFunction, Request, Response, RequestHandler } from "express";

import multer from "multer";

import { JsonResponse } from "../../utils/jsonResponse";

export const multerErrorHandler = (
  upload: RequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Error",
        message: err.message,
      });
    } else if (err) {
      // An unknown error occurred when uploading.
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "file upload error.",
        message: err.message,
      });
    }

    next();
  });
};

export const multerImageWhiteList = ["image/png", "image/jpeg", "image/jpg"];
export const multerDocumentWhiteList = [
  "image/jpeg",
  "image/jpg",
  "application/pdf",
];

export const multerStorage = multer.memoryStorage();
