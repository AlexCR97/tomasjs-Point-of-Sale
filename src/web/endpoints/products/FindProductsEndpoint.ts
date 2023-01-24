import { FindProductsQueryHandler } from "@/infrastructure/cqrs/products";
import { inject } from "tomasjs";
import { HttpContext } from "tomasjs/core";
import { endpoint, Endpoint } from "tomasjs/endpoints";

@endpoint("get")
export class FindProductsEndpoint implements Endpoint {
  constructor(@inject(FindProductsQueryHandler) private readonly query: FindProductsQueryHandler) {}

  async handle({ request }: HttpContext) {
    return await this.query.fetch(request.query);
  }
}
