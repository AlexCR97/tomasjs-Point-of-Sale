import { CommandHandler } from "@/core/cqrs/commands";
import { UpdateWarehouseCommand } from "@/domain/cqrs/warehouse";
import { WarehouseRepo } from "@/infrastructure/mongo/repos";
import { inject, injectable } from "tomasjs";

@injectable()
export class UpdateWarehouseCommandHandler implements CommandHandler<UpdateWarehouseCommand> {
  constructor(@inject(WarehouseRepo) private readonly repo: WarehouseRepo) {}

  async execute(command: UpdateWarehouseCommand): Promise<void> {
    const existingEntity = await this.repo.getAsync(command.id);
    existingEntity.name = command.name;
    await this.repo.updateAsync(command.id, existingEntity);
  }
}
