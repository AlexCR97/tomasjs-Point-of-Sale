import { EndpointGroupBuilderFunction } from "tomasjs/builder/api-builder/EndpointGroupBuilderFunction";
import { CreateWarehouseEndpoint } from "./CreateWarehouseEndpoint";
import { DeleteWarehouseEndpoint } from "./DeleteWarehouseEndpoint";
import { FindWarehousesEndpoint } from "./FindWarehousesEndpoint";
import { GetWarehouseEndpoint } from "./GetWarehouseEndpoint";
import { UpdateWarehouseEndpoint } from "./UpdateWarehouseEndpoint";

export { CreateWarehouseEndpoint } from "./CreateWarehouseEndpoint";
export { DeleteWarehouseEndpoint } from "./DeleteWarehouseEndpoint";
export { FindWarehousesEndpoint } from "./FindWarehousesEndpoint";
export { GetWarehouseEndpoint } from "./GetWarehouseEndpoint";
export { UpdateWarehouseEndpoint } from "./UpdateWarehouseEndpoint";

export const WarehouseEndpoints: EndpointGroupBuilderFunction = (endpoints) => {
  endpoints
    .useBasePath("api/warehouses")
    .useEndpoint(CreateWarehouseEndpoint)
    .useEndpoint(DeleteWarehouseEndpoint)
    .useEndpoint(FindWarehousesEndpoint)
    .useEndpoint(GetWarehouseEndpoint)
    .useEndpoint(UpdateWarehouseEndpoint);
};
