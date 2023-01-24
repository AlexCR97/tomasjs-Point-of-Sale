import "express-async-errors";
import "reflect-metadata";

import { AppBuilder, ContainerBuilder } from "tomasjs/builder";
import { MikroOrmSetup, RepositorySetup } from "tomasjs/mikro-orm";
import { environment } from "./environment";
import {
  CreateProductCommandHandler,
  FindProductsQueryHandler,
} from "./infrastructure/cqrs/products";
import "./infrastructure/mapper/mappings";
import { BaseDocument, ProductDocument } from "./infrastructure/mongo/documents";
import { ProductRepo } from "./infrastructure/mongo/repos";
import { CreateProductEndpoint, FindProductsEndpoint } from "./web/endpoints/products";

async function main() {
  await new ContainerBuilder()
    .setup(
      new MikroOrmSetup({
        clientUrl: environment.mongo.connectionString,
        dbName: environment.mongo.database,
        entities: [BaseDocument, ProductDocument],
        allowGlobalContext: true,
        type: "mongo",
      })
    )
    .setup(new RepositorySetup("mongo", ProductDocument))
    .setup((services) => {
      // Initialize your dependencies here
      services.addClass(ProductRepo);
      services.addClass(CreateProductCommandHandler);
      services.addClass(FindProductsQueryHandler);
    })
    .buildAsync();

  // Initialize your http pipeline here
  await new AppBuilder()
    .useJson()
    .useEndpointGroup((endpoints) => {
      endpoints
        .useBasePath("api/products")
        .useEndpoint(CreateProductEndpoint)
        .useEndpoint(FindProductsEndpoint);
    })
    .buildAsync(environment.port);

  console.log("Point of Sale app running at http://localhost:" + environment.port + "/");
}

main();
