import "express-async-errors";
import "reflect-metadata";
import { AppBuilder, ContainerBuilder } from "tomasjs/builder";
import { RepositorySetup } from "tomasjs/mikro-orm";
import { environment } from "./environment";
import { ProductCqrsSetup } from "./infrastructure/cqrs/products";
import { WarehouseCqrsSetup } from "./infrastructure/cqrs/warehouse";
import "./infrastructure/mapper/mappings";
import { MongoSetup, ReposSetup } from "./infrastructure/mongo";
import { ProductDocument, WarehouseDocument } from "./infrastructure/mongo/documents";
import { ProductEndpoints } from "./web/endpoints/products";
import { WarehouseEndpoints } from "./web/endpoints/warehouses";

async function main() {
  await new ContainerBuilder()
    .setup(MongoSetup)
    .setup(new RepositorySetup("mongo", ProductDocument))
    .setup(new RepositorySetup("mongo", WarehouseDocument))
    .setup(ReposSetup)
    .setup(ProductCqrsSetup)
    .setup(WarehouseCqrsSetup)
    .buildAsync();

  // Initialize your http pipeline here
  await new AppBuilder()
    .useCors()
    .useJson()
    .useEndpointGroup(ProductEndpoints)
    .useEndpointGroup(WarehouseEndpoints)
    .buildAsync(environment.port);

  console.log("Point of Sale app running at http://localhost:" + environment.port + "/");
}

main();
