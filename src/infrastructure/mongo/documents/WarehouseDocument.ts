import { AutoMap } from "@automapper/classes";
import { Entity, Property } from "@mikro-orm/core";
import { BaseDocument } from "./BaseDocument";

@Entity({ collection: "warehouses" })
export class WarehouseDocument extends BaseDocument {
  @Property()
  @AutoMap()
  name!: string;
}
