import { PipelineStage } from "mongoose";

export const getPaginationAggregation = (
  page: number,
  itemPerPage: number,
  afterPagination?: PipelineStage.FacetPipelineStage[]
): PipelineStage[] => {
  const aggr: PipelineStage[] = [];

  if (page && itemPerPage) {
    const offset = Number(itemPerPage) * (Number(page) - 1);

    const data: PipelineStage.FacetPipelineStage[] = [
      {
        $skip: offset,
      },
      {
        $limit: Number(itemPerPage),
      },
    ];

    afterPagination && data.push(...afterPagination);

    // bunch data
    aggr.push({
      $facet: {
        data: data,
        pageData: [
          {
            $count: "total",
          },
        ],
      },
    });

    // Unwind Page Data
    aggr.push({
      $unwind: {
        path: "$pageData",
        preserveNullAndEmptyArrays: true,
      },
    });
  } else {
    afterPagination && aggr.push(...afterPagination);
  }

  return aggr;
};
