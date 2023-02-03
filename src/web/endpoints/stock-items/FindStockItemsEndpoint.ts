import { FindStockItemsQueryHandler } from "@/infrastructure/cqrs/stock-items";
import { inject } from "tomasjs";
import { HttpContext } from "tomasjs/core";
import { Endpoint, endpoint } from "tomasjs/endpoints";

@endpoint("get")
export class FindStockItemsEndpoint implements Endpoint {
  constructor(
    @inject(FindStockItemsQueryHandler) private readonly query: FindStockItemsQueryHandler
  ) {}

  async handle({ request }: HttpContext) {
    return await this.query.fetch(request.query);
  }
}
