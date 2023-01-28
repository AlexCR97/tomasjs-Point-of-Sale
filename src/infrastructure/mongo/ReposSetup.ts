import { ContainerSetup } from "tomasjs/builder";
import { ProductRepo } from "./repos/ProductRepo";
import { WarehouseRepo } from "./repos/WarehouseRepo";

export const ReposSetup: ContainerSetup = (services) => {
  services.addClass(ProductRepo);
  services.addClass(WarehouseRepo);
};
