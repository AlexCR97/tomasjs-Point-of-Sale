import { GetProductQuery } from "@/domain/cqrs/products";
import { GetProductQueryHandler } from "@/infrastructure/cqrs/products";
import { inject } from "tomasjs";
import { HttpContext } from "tomasjs/core";
import { endpoint, Endpoint, path } from "tomasjs/endpoints";

@endpoint("get")
@path(":id")
export class GetProductEndpoint implements Endpoint {
  constructor(@inject(GetProductQueryHandler) private readonly query: GetProductQueryHandler) {}

  async handle({ request }: HttpContext) {
    return await this.query.fetch(new GetProductQuery(request.params.id));
  }
}
