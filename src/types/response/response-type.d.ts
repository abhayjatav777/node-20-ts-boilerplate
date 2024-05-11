type TServerResponse<DATA, EXTRA_DATA> = {
  statusCode: 200 | 400 | 500 | 401 | 201 | 204 | 429 | 202;
  status: "success" | "error";
  title: string;
  message: string;
  data?: DATA;
  extraData?: EXTRA_DATA;
  pageData?: TPageData;
};
