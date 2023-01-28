import { DeleteCommand } from "@/core/cqrs/commands";

export class DeleteProductCommand extends DeleteCommand<string> {}
