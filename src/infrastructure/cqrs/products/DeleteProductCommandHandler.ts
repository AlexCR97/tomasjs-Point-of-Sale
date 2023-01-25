import { CommandHandler } from "@/core/cqrs/commands";
import { DeleteProductCommand } from "@/domain/cqrs/products";
import { ProductRepo } from "@/infrastructure/mongo/repos";
import { inject, injectable } from "tomasjs";

@injectable()
export class DeleteProductCommandHandler implements CommandHandler<DeleteProductCommand> {
  constructor(@inject(ProductRepo) private readonly repo: ProductRepo) {}

  async execute(command: DeleteProductCommand): Promise<void> {
    await this.repo.deleteAsync(command.id);
  }
}
