import { DeleteStockItemCommand } from "@/domain/cqrs/stock-items";
import { StockItemEntity } from "@/domain/entities";
import { StockItemDocument } from "@/infrastructure/mongo/documents";
import { StockItemRepo } from "@/infrastructure/mongo/repos";
import { inject, injectable } from "tomasjs";
import { DeleteCommandHandler } from "../core";

@injectable()
export class DeleteStockItemCommandHandler extends DeleteCommandHandler<
  StockItemEntity,
  StockItemDocument,
  DeleteStockItemCommand,
  StockItemRepo
> {
  constructor(@inject(StockItemRepo) repo: StockItemRepo) {
    super(repo);
  }
}
