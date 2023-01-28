import { DeleteCommand } from "@/core/cqrs/commands";

export class DeleteWarehouseCommand extends DeleteCommand<string> {}
