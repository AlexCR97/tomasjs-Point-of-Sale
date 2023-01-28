import { FindWarehousesQueryHandler } from "@/infrastructure/cqrs/warehouse";
import { inject } from "tomasjs";
import { HttpContext } from "tomasjs/core";
import { Endpoint, endpoint } from "tomasjs/endpoints";

@endpoint("get")
export class FindWarehousesEndpoint implements Endpoint {
  constructor(
    @inject(FindWarehousesQueryHandler) private readonly query: FindWarehousesQueryHandler
  ) {}

  async handle({ request }: HttpContext) {
    return await this.query.fetch(request.query);
  }
}
