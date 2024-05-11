export class ErrorResponse extends Error {
  title: string;
  statusCode: 200 | 400 | 500 | 401 | 201 | 204 | 429 | 202 = 500;
  status = "error";
  constructor(
    err: {
      title: string;
      message: string;
      statusCode: TServerResponse<null, null>["statusCode"];
    } = {
      title: "internal server error",
      message: "something went wrong in server",
      statusCode: 500,
    }
  ) {
    super(err.message);
    this.title = err.title;
    this.message = err.message;
    this.statusCode = err.statusCode;
  }
}
