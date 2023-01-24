import { CommandHandler } from "@/core/cqrs/commands";
import { CreateProductCommand } from "@/domain/cqrs/products";
import { ProductEntity } from "@/domain/entities";
import { ProductRepo } from "@/infrastructure/mongo/repos";
import { inject, injectable } from "tomasjs";

@injectable()
export class CreateProductCommandHandler
  implements CommandHandler<CreateProductCommand, ProductEntity>
{
  constructor(@inject(ProductRepo) private readonly repo: ProductRepo) {}

  async execute(command: CreateProductCommand): Promise<ProductEntity> {
    const product = new ProductEntity();
    product.name = command.name;
    product.image = command.image;
    return await this.repo.createAsync(product);
  }
}
