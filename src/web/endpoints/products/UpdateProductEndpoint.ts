import { UpdateProductCommand } from "@/domain/cqrs/products";
import { UpdateProductCommandHandler } from "@/infrastructure/cqrs/products";
import { inject } from "tomasjs";
import { HttpContext } from "tomasjs/core";
import { Endpoint, endpoint, path } from "tomasjs/endpoints";
import { bodyPipe } from "tomasjs/pipes";
import { InstanceTransform } from "tomasjs/transforms";

@endpoint("put")
@path(":id")
export class UpdateProductEndpoint implements Endpoint {
  constructor(
    @inject(UpdateProductCommandHandler) private readonly command: UpdateProductCommandHandler
  ) {}

  @bodyPipe(new InstanceTransform(UpdateProductCommand))
  async handle({ request }: HttpContext) {
    return await this.command.execute(request.body);
  }
}
