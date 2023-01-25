import { ContainerSetup } from "tomasjs/builder";
import { CreateProductCommandHandler } from "./CreateProductCommandHandler";
import { DeleteProductCommandHandler } from "./DeleteProductCommandHandler";
import { FindProductsQueryHandler } from "./FindProductsQueryHandler";
import { GetProductQueryHandler } from "./GetProductQueryHandler";
import { UpdateProductCommandHandler } from "./UpdateProductCommandHandler";

export { CreateProductCommandHandler } from "./CreateProductCommandHandler";
export { DeleteProductCommandHandler } from "./DeleteProductCommandHandler";
export { FindProductsQueryHandler } from "./FindProductsQueryHandler";
export { GetProductQueryHandler } from "./GetProductQueryHandler";
export { UpdateProductCommandHandler } from "./UpdateProductCommandHandler";

export const ProductCqrsSetup: ContainerSetup = (services) => {
  services
    .addClass(CreateProductCommandHandler)
    .addClass(DeleteProductCommandHandler)
    .addClass(FindProductsQueryHandler)
    .addClass(GetProductQueryHandler)
    .addClass(UpdateProductCommandHandler);
};
