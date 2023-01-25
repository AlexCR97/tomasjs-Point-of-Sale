import { CommandHandler } from "@/core/cqrs/commands";
import { UpdateProductCommand } from "@/domain/cqrs/products";
import { ProductRepo } from "@/infrastructure/mongo/repos";
import { inject, injectable } from "tomasjs";

@injectable()
export class UpdateProductCommandHandler implements CommandHandler<UpdateProductCommand> {
  constructor(@inject(ProductRepo) private readonly repo: ProductRepo) {}

  async execute(command: UpdateProductCommand): Promise<void> {
    return await this.repo.updateAsync(command.id, command);
  }
}
