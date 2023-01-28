import { GetWarehouseQuery } from "@/domain/cqrs/warehouse";
import { WarehouseEntity } from "@/domain/entities";
import { WarehouseDocument } from "@/infrastructure/mongo/documents";
import { WarehouseRepo } from "@/infrastructure/mongo/repos";
import { inject, injectable } from "tomasjs";
import { GetQueryHandler } from "../core";

@injectable()
export class GetWarehouseQueryHandler extends GetQueryHandler<
  WarehouseEntity,
  WarehouseDocument,
  WarehouseRepo,
  GetWarehouseQuery
> {
  constructor(@inject(WarehouseRepo) repo: WarehouseRepo) {
    super(repo);
  }
}
