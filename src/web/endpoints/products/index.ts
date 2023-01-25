import { EndpointGroupBuilderFunction } from "tomasjs/builder/api-builder/EndpointGroupBuilderFunction";
import { CreateProductEndpoint } from "./CreateProductEndpoint";
import { DeleteProductEndpoint } from "./DeleteProductEndpoint";
import { FindProductsEndpoint } from "./FindProductsEndpoint";
import { GetProductEndpoint } from "./GetProductEndpoint";
import { UpdateProductEndpoint } from "./UpdateProductEndpoint";

export const ProductEndpoints: EndpointGroupBuilderFunction = (endpoints) => {
  endpoints
    .useBasePath("api/products")
    .useEndpoint(CreateProductEndpoint)
    .useEndpoint(DeleteProductEndpoint)
    .useEndpoint(FindProductsEndpoint)
    .useEndpoint(GetProductEndpoint)
    .useEndpoint(UpdateProductEndpoint);
};
