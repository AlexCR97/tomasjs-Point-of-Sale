import { CreateWarehouseCommand } from "@/domain/cqrs/warehouse";
import { CreateProductCommandHandler } from "@/infrastructure/cqrs/products";
import { CreateWarehouseCommandHandler } from "@/infrastructure/cqrs/warehouse";
import { inject } from "tomasjs";
import { HttpContext } from "tomasjs/core";
import { Endpoint, endpoint } from "tomasjs/endpoints";
import { bodyPipe } from "tomasjs/pipes";
import { InstanceTransform } from "tomasjs/transforms";

@endpoint("post")
export class CreateWarehouseEndpoint implements Endpoint {
  constructor(
    @inject(CreateWarehouseCommandHandler) private readonly command: CreateProductCommandHandler
  ) {}

  @bodyPipe(new InstanceTransform(CreateWarehouseCommand))
  async handle({ request }: HttpContext) {
    return await this.command.execute(request.body);
  }
}
