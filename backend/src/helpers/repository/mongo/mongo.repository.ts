import { IPagination } from 'src/common/interface/common';

export abstract class MongoRepository {
  getPaginationParams(
    data: IPagination,
  ): { limit: number; skip: number } | undefined {
    return { limit: data.limit, skip: (data.page - 1) * data.limit };
  }
}
