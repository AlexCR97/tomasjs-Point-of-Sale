import { CommandHandler, DeleteCommand } from "@/core/cqrs/commands";
import { BaseEntity } from "@/domain/entities";
import { BaseDocument } from "@/infrastructure/mongo/documents";
import { BaseRepo } from "@/infrastructure/mongo/repos/core";

export abstract class DeleteCommandHandler<
  TEntity extends BaseEntity,
  TDocument extends BaseDocument,
  TCommand extends DeleteCommand<string>,
  TRepo extends BaseRepo<TEntity, TDocument>
> implements CommandHandler<TCommand>
{
  constructor(protected readonly repo: TRepo) {}

  async execute(command: TCommand): Promise<void> {
    await this.repo.deleteAsync(command.id);
  }
}
