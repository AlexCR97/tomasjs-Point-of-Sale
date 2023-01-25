import { ContainerSetup } from "tomasjs/builder";
import { ProductRepo } from "./ProductRepo";

export const ReposSetup: ContainerSetup = (services) => {
  services.addClass(ProductRepo);
};
