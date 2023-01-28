import { GetQuery, QueryHandler } from "@/core/cqrs/queries";
import { BaseEntity } from "@/domain/entities";
import { BaseDocument } from "@/infrastructure/mongo/documents";
import { BaseRepo } from "@/infrastructure/mongo/repos/core";

export abstract class GetQueryHandler<
  TEntity extends BaseEntity,
  TDocument extends BaseDocument,
  TRepo extends BaseRepo<TEntity, TDocument>,
  TQuery extends GetQuery
> implements QueryHandler<TQuery, TEntity>
{
  constructor(private readonly repo: TRepo) {}

  async fetch(query: TQuery): Promise<TEntity> {
    return await this.repo.getAsync(query.id);
  }
}
