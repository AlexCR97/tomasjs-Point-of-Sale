import { UpdateStockItemCommand } from "@/domain/cqrs/stock-items";
import { UpdateStockItemCommandHandler } from "@/infrastructure/cqrs/stock-items";
import { inject } from "tomasjs";
import { HttpContext } from "tomasjs/core";
import { Endpoint, endpoint, path } from "tomasjs/endpoints";
import { bodyPipe } from "tomasjs/pipes";
import { InstanceTransform } from "tomasjs/transforms";

@endpoint("put")
@path(":id")
export class UpdateStockItemEndpoint implements Endpoint {
  constructor(
    @inject(UpdateStockItemCommandHandler) private readonly command: UpdateStockItemCommandHandler
  ) {}

  @bodyPipe(new InstanceTransform(UpdateStockItemCommand))
  async handle({ request }: HttpContext) {
    return await this.command.execute(request.body);
  }
}
