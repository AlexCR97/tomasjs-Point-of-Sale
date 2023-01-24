import { CreateProductCommand } from "@/domain/cqrs/products";
import { CreateProductCommandHandler } from "@/infrastructure/cqrs/products";
import { inject } from "tomasjs";
import { HttpContext } from "tomasjs/core";
import { Endpoint, endpoint } from "tomasjs/endpoints";
import { bodyPipe } from "tomasjs/pipes";
import { InstanceTransform } from "tomasjs/transforms";

@endpoint("post")
export class CreateProductEndpoint implements Endpoint {
  constructor(
    @inject(CreateProductCommandHandler) private readonly command: CreateProductCommandHandler
  ) {}

  @bodyPipe(new InstanceTransform(CreateProductCommand))
  async handle({ request }: HttpContext) {
    return await this.command.execute(request.body);
  }
}
