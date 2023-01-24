import { AutoMap } from "@automapper/classes";
import { Entity, Property } from "@mikro-orm/core";
import { BaseDocument } from "./BaseDocument";

@Entity()
export class StockItemDocument extends BaseDocument {
  @Property()
  @AutoMap()
  warehouseId!: string;

  @Property()
  @AutoMap()
  productId!: string;

  @Property()
  @AutoMap()
  price!: number;

  @Property({ nullable: true })
  @AutoMap()
  stock?: number;
}
