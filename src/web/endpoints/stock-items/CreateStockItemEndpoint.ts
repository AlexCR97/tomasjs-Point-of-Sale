import { CreateStockItemCommandHandler } from "@/infrastructure/cqrs/stock-items";
import { inject } from "tomasjs";
import { HttpContext } from "tomasjs/core";
import { Endpoint, endpoint } from "tomasjs/endpoints";
import { bodyPipe } from "tomasjs/pipes";
import { InstanceTransform } from "tomasjs/transforms";

@endpoint("post")
export class CreateStockItemEndpoint implements Endpoint {
  constructor(
    @inject(CreateStockItemCommandHandler) private readonly command: CreateStockItemCommandHandler
  ) {}

  @bodyPipe(new InstanceTransform(CreateStockItemCommandHandler))
  async handle({ request }: HttpContext) {
    return await this.command.execute(request.body);
  }
}
