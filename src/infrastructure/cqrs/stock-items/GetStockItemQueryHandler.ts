import { GetStockItemQuery } from "@/domain/cqrs/stock-items";
import { StockItemEntity } from "@/domain/entities";
import { StockItemDocument } from "@/infrastructure/mongo/documents";
import { StockItemRepo } from "@/infrastructure/mongo/repos";
import { inject, injectable } from "tomasjs";
import { GetQueryHandler } from "../core";

@injectable()
export class GetStockItemQueryHandler extends GetQueryHandler<
  StockItemEntity,
  StockItemDocument,
  StockItemRepo,
  GetStockItemQuery
> {
  constructor(@inject(StockItemRepo) repo: StockItemRepo) {
    super(repo);
  }
}
