import { environment } from "@/environment";
import { MikroOrmSetup } from "tomasjs/mikro-orm";
import { BaseDocument, ProductDocument, StockItemDocument, WarehouseDocument } from "./documents";

export const MongoSetup = new MikroOrmSetup({
  clientUrl: environment.mongo.connectionString,
  dbName: environment.mongo.database,
  entities: [BaseDocument, ProductDocument, WarehouseDocument, StockItemDocument],
  allowGlobalContext: true,
  type: "mongo",
});
