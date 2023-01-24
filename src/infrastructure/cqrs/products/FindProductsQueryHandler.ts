import { QueryHandler } from "@/core/cqrs/queries";
import { FindProductsQuery } from "@/domain/cqrs/products";
import { ProductEntity } from "@/domain/entities";
import { ProductRepo } from "@/infrastructure/mongo/repos";
import { inject, injectable } from "tomasjs";

@injectable()
export class FindProductsQueryHandler implements QueryHandler<FindProductsQuery, ProductEntity[]> {
  constructor(@inject(ProductRepo) private readonly repo: ProductRepo) {}

  async fetch(query: FindProductsQuery): Promise<ProductEntity[]> {
    return await this.repo.findAsync(query);
  }
}
