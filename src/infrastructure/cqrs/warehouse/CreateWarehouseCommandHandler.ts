import { CommandHandler } from "@/core/cqrs/commands";
import { CreateWarehouseCommand } from "@/domain/cqrs/warehouse";
import { WarehouseEntity } from "@/domain/entities";
import { WarehouseRepo } from "@/infrastructure/mongo/repos";
import { inject, injectable } from "tomasjs";

@injectable()
export class CreateWarehouseCommandHandler
  implements CommandHandler<CreateWarehouseCommand, WarehouseEntity>
{
  constructor(@inject(WarehouseRepo) private readonly repo: WarehouseRepo) {}

  async execute(command: CreateWarehouseCommand): Promise<WarehouseEntity> {
    return await this.repo.createAsync(new WarehouseEntity(command.name));
  }
}
