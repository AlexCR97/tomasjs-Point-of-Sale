import { AutoMap } from "@automapper/classes";
import { Entity, Property } from "@mikro-orm/core";
import { BaseDocument } from "./BaseDocument";

@Entity({ collection: "products" })
export class ProductDocument extends BaseDocument {
  @Property()
  @AutoMap()
  name!: string;

  @Property({ nullable: true })
  @AutoMap()
  image?: string;
}
