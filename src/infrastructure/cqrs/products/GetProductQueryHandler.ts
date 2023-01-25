import { QueryHandler } from "@/core/cqrs/queries";
import { GetProductQuery } from "@/domain/cqrs/products";
import { ProductEntity } from "@/domain/entities";
import { ProductRepo } from "@/infrastructure/mongo/repos";
import { inject, injectable } from "tomasjs";

@injectable()
export class GetProductQueryHandler implements QueryHandler<GetProductQuery, ProductEntity> {
  constructor(@inject(ProductRepo) private readonly repo: ProductRepo) {}

  async fetch(query: GetProductQuery): Promise<ProductEntity> {
    return await this.repo.getAsync(query.id);
  }
}
