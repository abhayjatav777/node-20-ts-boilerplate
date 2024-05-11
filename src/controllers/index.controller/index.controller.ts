import { Request, Response } from "express";

import { JsonResponse } from "../../utils/jsonResponse";

class IndexController {
  index = (req: Request, res: Response) => {
    return JsonResponse(res, {
      statusCode: 200,
      title: "index api called",
      status: "success",
      message: "api called successfully",
    });
  };
}

export default new IndexController();
