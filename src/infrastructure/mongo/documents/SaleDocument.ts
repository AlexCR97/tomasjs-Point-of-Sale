import { AutoMap } from "@automapper/classes";
import { Entity, Property } from "@mikro-orm/core";
import { BaseDocument } from "./BaseDocument";

@Entity()
export class SaleDocument extends BaseDocument {
  @Property({ nullable: true })
  @AutoMap()
  sellerId?: string;

  @Property({ nullable: true })
  @AutoMap()
  buyerId?: string;

  @Property()
  @AutoMap(() => [SaleProductDocument])
  products!: SaleProductDocument[];
}

class SaleProductDocument {
  @Property()
  @AutoMap()
  productId!: string;

  @Property()
  @AutoMap()
  price!: number;

  @Property()
  @AutoMap()
  amount!: number;
}
