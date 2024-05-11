import { PipelineStage } from "mongoose";
import { getPaginationAggregation } from "../../aggregation/pagination/pagination.aggregation";
import { models } from "../../models";

type ModelType = keyof typeof models;

interface IPaginated {
  paging: TPaging;
  model: ModelType;
  aggregationArray: PipelineStage[];
  afterPaginated?: PipelineStage.FacetPipelineStage[];
}

export const paginated = async (props: IPaginated): Promise<TPagedReturn> => {
  const { model, paging, aggregationArray, afterPaginated } = props;
  const paginationAggregation = getPaginationAggregation(
    paging.page,
    paging.itemPerPage,
    afterPaginated
  );
  const aggregateQuery: PipelineStage[] = [
    ...aggregationArray,
    ...paginationAggregation,
  ];

  let results: TPagedReturn[] = [];

  if (aggregateQuery.length > 0) {
    results = await models[model].aggregate(aggregateQuery).exec();
  }

  if (results.length == 0) {
    return {
      data: [],
      pageData: { total: 0 },
    };
  }

  return {
    data: results[0].data,
    pageData: results[0].pageData ?? { total: 0 },
  };
};
