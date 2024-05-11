type TPaging = {
  page: number;
  itemPerPage: number;
};

type TPageData = {
  total: number;
};

type TPagedReturn<DATA = unknown> = {
  data: DATA;
  pageData: TPageData;
};
