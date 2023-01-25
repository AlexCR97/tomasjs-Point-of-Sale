import "express-async-errors";
import "reflect-metadata";
import { AppBuilder, ContainerBuilder } from "tomasjs/builder";
import { RepositorySetup } from "tomasjs/mikro-orm";
import { environment } from "./environment";
import { MongoSetup } from "./infrastructure";
import { ProductCqrsSetup } from "./infrastructure/cqrs/products";
import "./infrastructure/mapper/mappings";
import { ProductDocument } from "./infrastructure/mongo/documents";
import { ReposSetup } from "./infrastructure/mongo/repos";
import { ProductEndpoints } from "./web/endpoints/products";

async function main() {
  await new ContainerBuilder()
    .setup(MongoSetup)
    .setup(new RepositorySetup("mongo", ProductDocument))
    .setup(ReposSetup)
    .setup(ProductCqrsSetup)
    .buildAsync();

  // Initialize your http pipeline here
  await new AppBuilder().useJson().useEndpointGroup(ProductEndpoints).buildAsync(environment.port);

  console.log("Point of Sale app running at http://localhost:" + environment.port + "/");
}

main();
