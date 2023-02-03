import { ContainerSetup } from "tomasjs/builder";
import { ProductRepo } from "./repos/ProductRepo";
import { StockItemRepo } from "./repos/StockItemRepo";
import { WarehouseRepo } from "./repos/WarehouseRepo";

export const ReposSetup: ContainerSetup = (services) => {
  services.addClass(ProductRepo).addClass(StockItemRepo).addClass(WarehouseRepo);
};
