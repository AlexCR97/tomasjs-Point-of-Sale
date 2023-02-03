import { StockItemEntity } from "@/domain/entities";
import { injectable } from "tomasjs";
import { inRepository, Repository } from "tomasjs/mikro-orm/mongodb";
import { StockItemDocument } from "../documents";
import { BaseRepo } from "./core";

@injectable()
export class StockItemRepo extends BaseRepo<StockItemEntity, StockItemDocument> {
  constructor(@inRepository(StockItemDocument) repo: Repository<StockItemDocument>) {
    super(StockItemEntity, StockItemDocument, repo);
  }
}
