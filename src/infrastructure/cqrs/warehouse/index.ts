import { ContainerSetup } from "tomasjs/builder";
import { CreateWarehouseCommandHandler } from "./CreateWarehouseCommandHandler";
import { DeleteWarehouseCommandHandler } from "./DeleteWarehouseCommandHandler";
import { FindWarehousesQueryHandler } from "./FindWarehouseQueryHandler";
import { GetWarehouseQueryHandler } from "./GetWarehouseQueryHandler";
import { UpdateWarehouseCommandHandler } from "./UpdateWarehouseCommandHandler";

export { CreateWarehouseCommandHandler } from "./CreateWarehouseCommandHandler";
export { DeleteWarehouseCommandHandler } from "./DeleteWarehouseCommandHandler";
export { FindWarehousesQueryHandler } from "./FindWarehouseQueryHandler";
export { GetWarehouseQueryHandler } from "./GetWarehouseQueryHandler";
export { UpdateWarehouseCommandHandler } from "./UpdateWarehouseCommandHandler";

export const WarehouseCqrsSetup: ContainerSetup = (services) => {
  services
    .addClass(CreateWarehouseCommandHandler)
    .addClass(DeleteWarehouseCommandHandler)
    .addClass(FindWarehousesQueryHandler)
    .addClass(GetWarehouseQueryHandler)
    .addClass(UpdateWarehouseCommandHandler);
};
