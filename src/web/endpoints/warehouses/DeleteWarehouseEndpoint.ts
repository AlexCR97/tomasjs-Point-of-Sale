import { DeleteWarehouseCommand } from "@/domain/cqrs/warehouse";
import { DeleteWarehouseCommandHandler } from "@/infrastructure/cqrs/warehouse";
import { inject } from "tomasjs";
import { HttpContext } from "tomasjs/core";
import { Endpoint, endpoint, path } from "tomasjs/endpoints";

@endpoint("delete")
@path(":id")
export class DeleteWarehouseEndpoint implements Endpoint {
  constructor(
    @inject(DeleteWarehouseCommandHandler) private readonly command: DeleteWarehouseCommandHandler
  ) {}

  async handle({ request }: HttpContext) {
    return await this.command.execute(new DeleteWarehouseCommand(request.params.id));
  }
}
