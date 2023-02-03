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

  constructor(warehouseId: string, productId: string, price: number, stock?: number) {
    super();
    this.warehouseId = warehouseId;
    this.productId = productId;
    this.price = price;
    this.stock = stock;
  }
}
