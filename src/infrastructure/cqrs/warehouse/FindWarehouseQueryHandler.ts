import { FindWarehousesQuery } from "@/domain/cqrs/warehouse";
import { WarehouseEntity } from "@/domain/entities";
import { WarehouseDocument } from "@/infrastructure/mongo/documents";
import { WarehouseRepo } from "@/infrastructure/mongo/repos";
import { inject, injectable } from "tomasjs";
import { FindQueryHandler } from "../core";

@injectable()
export class FindWarehousesQueryHandler extends FindQueryHandler<
  WarehouseEntity,
  WarehouseDocument,
  WarehouseRepo,
  FindWarehousesQuery
> {
  constructor(@inject(WarehouseRepo) repo: WarehouseRepo) {
    super(repo);
  }
}
