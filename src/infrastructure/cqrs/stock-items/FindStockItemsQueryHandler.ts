import { FindStockItemsQuery } from "@/domain/cqrs/stock-items";
import { StockItemEntity } from "@/domain/entities";
import { StockItemDocument } from "@/infrastructure/mongo/documents";
import { StockItemRepo } from "@/infrastructure/mongo/repos";
import { inject, injectable } from "tomasjs";
import { FindQueryHandler } from "../core";

@injectable()
export class FindStockItemsQueryHandler extends FindQueryHandler<
  StockItemEntity,
  StockItemDocument,
  StockItemRepo,
  FindStockItemsQuery
> {
  constructor(@inject(StockItemRepo) repo: StockItemRepo) {
    super(repo);
  }
}
