import { environment } from "@/environment";
import { MikroOrmSetup } from "tomasjs/mikro-orm";
import { BaseDocument, ProductDocument } from "./mongo/documents";

export const MongoSetup = new MikroOrmSetup({
  clientUrl: environment.mongo.connectionString,
  dbName: environment.mongo.database,
  entities: [BaseDocument, ProductDocument],
  allowGlobalContext: true,
  type: "mongo",
});
