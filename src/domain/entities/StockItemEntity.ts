import { AutoMap } from "@automapper/classes";
import { BaseEntity } from "./BaseEntity";

export class StockItemEntity extends BaseEntity {
  @AutoMap()
  warehouseId!: string;

  @AutoMap()
  productId!: string;

  @AutoMap()
  price!: number;

  @AutoMap()
  stock?: number;
}
