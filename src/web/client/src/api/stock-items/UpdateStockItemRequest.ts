export class UpdateStockItemRequest {
  warehouseId!: string;
  productId!: string;
  id!: string;
  price!: number;
  stock?: number;

  clear() {
    this.warehouseId = "";
    this.productId = "";
    this.id = "";
    this.price = undefined!;
    this.stock = undefined;
  }
}
