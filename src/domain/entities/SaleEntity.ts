import { AutoMap } from "@automapper/classes";
import { BaseEntity } from "./BaseEntity";

export class SaleEntity extends BaseEntity {
  /** The ID of the User who sold. */
  @AutoMap()
  sellerId?: string;

  /** The ID of the Customer who bought */
  @AutoMap()
  buyerId?: string;

  /** The sold products. */
  @AutoMap(() => [SaleProductEntity])
  products!: SaleProductEntity[];
}

class SaleProductEntity {
  @AutoMap()
  productId!: string;

  @AutoMap()
  price!: number;

  @AutoMap()
  amount!: number;
}
