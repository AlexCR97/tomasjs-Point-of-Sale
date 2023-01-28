import { GetWarehouseQuery } from "@/domain/cqrs/warehouse";
import { GetWarehouseQueryHandler } from "@/infrastructure/cqrs/warehouse";
import { inject } from "tomasjs";
import { HttpContext } from "tomasjs/core";
import { Endpoint, endpoint, path } from "tomasjs/endpoints";

@endpoint("get")
@path(":id")
export class GetWarehouseEndpoint implements Endpoint {
  constructor(@inject(GetWarehouseQueryHandler) private readonly query: GetWarehouseQueryHandler) {}
  async handle({ request }: HttpContext) {
    return await this.query.fetch(new GetWarehouseQuery(request.params.id));
  }
}
