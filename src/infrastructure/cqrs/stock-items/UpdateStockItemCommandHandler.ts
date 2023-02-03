import { CommandHandler } from "@/core/cqrs/commands";
import { UpdateStockItemCommand } from "@/domain/cqrs/stock-items";
import { StockItemRepo } from "@/infrastructure/mongo/repos";
import { inject, injectable } from "tomasjs";

@injectable()
export class UpdateStockItemCommandHandler implements CommandHandler<UpdateStockItemCommand> {
  constructor(@inject(StockItemRepo) private readonly repo: StockItemRepo) {}

  async execute(command: UpdateStockItemCommand): Promise<void> {
    const existingEntity = await this.repo.getAsync(command.id);
    existingEntity.price = command.price;
    existingEntity.stock = command.stock;
    await this.repo.updateAsync(command.id, existingEntity);
  }
}
