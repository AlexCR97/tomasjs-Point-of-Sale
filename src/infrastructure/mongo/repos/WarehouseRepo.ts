import { WarehouseEntity } from "@/domain/entities";
import { injectable } from "tomasjs";
import { inRepository, Repository } from "tomasjs/mikro-orm/mongodb";
import { WarehouseDocument } from "../documents";
import { BaseRepo } from "./core";

@injectable()
export class WarehouseRepo extends BaseRepo<WarehouseEntity, WarehouseDocument> {
  constructor(@inRepository(WarehouseDocument) repo: Repository<WarehouseDocument>) {
    super(WarehouseEntity, WarehouseDocument, repo);
  }
}
