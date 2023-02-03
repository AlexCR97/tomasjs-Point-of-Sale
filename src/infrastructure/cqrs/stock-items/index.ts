import { ContainerSetup } from "tomasjs/builder";
import { CreateStockItemCommandHandler } from "./CreateStockItemCommandHandler";
import { DeleteStockItemCommandHandler } from "./DeleteStockItemCommandHandler";
import { FindStockItemsQueryHandler } from "./FindStockItemsQueryHandler";
import { GetStockItemQueryHandler } from "./GetStockItemQueryHandler";
import { UpdateStockItemCommandHandler } from "./UpdateStockItemCommandHandler";

export { CreateStockItemCommandHandler } from "./CreateStockItemCommandHandler";
export { DeleteStockItemCommandHandler } from "./DeleteStockItemCommandHandler";
export { FindStockItemsQueryHandler } from "./FindStockItemsQueryHandler";
export { GetStockItemQueryHandler } from "./GetStockItemQueryHandler";
export { UpdateStockItemCommandHandler } from "./UpdateStockItemCommandHandler";

export const StockItemsCqrsSetup: ContainerSetup = (services) => {
  services
    .addClass(CreateStockItemCommandHandler)
    .addClass(DeleteStockItemCommandHandler)
    .addClass(FindStockItemsQueryHandler)
    .addClass(GetStockItemQueryHandler)
    .addClass(UpdateStockItemCommandHandler);
};
