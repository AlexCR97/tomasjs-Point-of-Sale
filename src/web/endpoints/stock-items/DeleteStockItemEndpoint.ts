import { DeleteStockItemCommand } from "@/domain/cqrs/stock-items";
import { DeleteStockItemCommandHandler } from "@/infrastructure/cqrs/stock-items";
import { inject } from "tomasjs";
import { HttpContext } from "tomasjs/core";
import { Endpoint, endpoint, path } from "tomasjs/endpoints";

@endpoint("delete")
@path(":id")
export class DeleteStockItemEndpoint implements Endpoint {
  constructor(
    @inject(DeleteStockItemCommandHandler) private readonly command: DeleteStockItemCommandHandler
  ) {}

  async handle({ request }: HttpContext) {
    return await this.command.execute(new DeleteStockItemCommand(request.params.id));
  }
}
