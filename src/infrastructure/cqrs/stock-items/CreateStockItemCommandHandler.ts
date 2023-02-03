import { CommandHandler } from "@/core/cqrs/commands";
import { CreateStockItemCommand } from "@/domain/cqrs/stock-items";
import { StockItemEntity } from "@/domain/entities";
import { StockItemRepo } from "@/infrastructure/mongo/repos";
import { inject, injectable } from "tomasjs";

@injectable()
export class CreateStockItemCommandHandler
  implements CommandHandler<CreateStockItemCommand, StockItemEntity>
{
  constructor(@inject(StockItemRepo) private readonly repo: StockItemRepo) {}

  async execute(command: CreateStockItemCommand): Promise<StockItemEntity> {
    return await this.repo.createAsync(
      new StockItemEntity(command.warehouseId, command.productId, command.price, command.stock)
    );
  }
}
