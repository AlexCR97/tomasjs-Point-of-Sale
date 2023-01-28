import { DeleteProductCommand } from "@/domain/cqrs/products";
import { DeleteProductCommandHandler } from "@/infrastructure/cqrs/products";
import { inject } from "tomasjs";
import { HttpContext } from "tomasjs/core";
import { Endpoint, endpoint, path } from "tomasjs/endpoints";

@endpoint("delete")
@path(":id")
export class DeleteProductEndpoint implements Endpoint {
  constructor(
    @inject(DeleteProductCommandHandler) private readonly command: DeleteProductCommandHandler
  ) {}

  async handle({ request }: HttpContext) {
    return await this.command.execute(new DeleteProductCommand(request.params.id));
  }
}
