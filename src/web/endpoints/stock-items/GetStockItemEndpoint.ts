import { GetStockItemQuery } from "@/domain/cqrs/stock-items";
import { GetStockItemQueryHandler } from "@/infrastructure/cqrs/stock-items";
import { inject } from "tomasjs";
import { HttpContext } from "tomasjs/core";
import { Endpoint, endpoint, path } from "tomasjs/endpoints";

@endpoint("get")
@path(":id")
export class GetStockItemEndpoint implements Endpoint {
  constructor(@inject(GetStockItemQueryHandler) private readonly query: GetStockItemQueryHandler) {}

  async handle({ request }: HttpContext) {
    return await this.query.fetch(new GetStockItemQuery(request.params.id));
  }
}
