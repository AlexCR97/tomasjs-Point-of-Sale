import { BaseModel } from "../core";

export class StockItemModel extends BaseModel {
  warehouseId!: string;
  productId!: string;
  price!: number;
  stock?: number;
}
