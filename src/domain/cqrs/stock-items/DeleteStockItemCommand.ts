import { DeleteCommand } from "@/core/cqrs/commands";

export class DeleteStockItemCommand extends DeleteCommand<string> {}
