import { DeleteWarehouseCommand } from "@/domain/cqrs/warehouse";
import { WarehouseEntity } from "@/domain/entities";
import { WarehouseDocument } from "@/infrastructure/mongo/documents";
import { WarehouseRepo } from "@/infrastructure/mongo/repos";
import { inject, injectable } from "tomasjs";
import { DeleteCommandHandler } from "../core";

@injectable()
export class DeleteWarehouseCommandHandler extends DeleteCommandHandler<
  WarehouseEntity,
  WarehouseDocument,
  DeleteWarehouseCommand,
  WarehouseRepo
> {
  constructor(@inject(WarehouseRepo) repo: WarehouseRepo) {
    super(repo);
  }
}
