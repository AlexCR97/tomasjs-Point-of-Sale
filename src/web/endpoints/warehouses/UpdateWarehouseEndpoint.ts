import { UpdateWarehouseCommand } from "@/domain/cqrs/warehouse";
import { UpdateWarehouseCommandHandler } from "@/infrastructure/cqrs/warehouse";
import { inject } from "tomasjs";
import { HttpContext } from "tomasjs/core";
import { Endpoint, endpoint, path } from "tomasjs/endpoints";
import { bodyPipe } from "tomasjs/pipes";
import { InstanceTransform } from "tomasjs/transforms";

@endpoint("put")
@path(":id")
export class UpdateWarehouseEndpoint implements Endpoint {
  constructor(
    @inject(UpdateWarehouseCommandHandler) private readonly command: UpdateWarehouseCommandHandler
  ) {}

  @bodyPipe(new InstanceTransform(UpdateWarehouseCommand))
  async handle({ request }: HttpContext) {
    return await this.command.execute(request.body);
  }
}
