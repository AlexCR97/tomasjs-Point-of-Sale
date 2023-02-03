import { EndpointGroupBuilderFunction } from "tomasjs/builder/api-builder/EndpointGroupBuilderFunction";
import { CreateStockItemEndpoint } from "./CreateStockItemEndpoint";
import { DeleteStockItemEndpoint } from "./DeleteStockItemEndpoint";
import { FindStockItemsEndpoint } from "./FindStockItemsEndpoint";
import { GetStockItemEndpoint } from "./GetStockItemEndpoint";
import { UpdateStockItemEndpoint } from "./UpdateStockItemEndpoint";

export const StockItemEndpoints: EndpointGroupBuilderFunction = (endpoints) => {
  endpoints
    .useBasePath("api/stock-items")
    .useEndpoint(CreateStockItemEndpoint)
    .useEndpoint(DeleteStockItemEndpoint)
    .useEndpoint(FindStockItemsEndpoint)
    .useEndpoint(GetStockItemEndpoint)
    .useEndpoint(UpdateStockItemEndpoint);
};
