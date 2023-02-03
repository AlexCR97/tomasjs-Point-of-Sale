export class CreateStockItemRequest {
  warehouseId!: string;
  productId!: string;
  price!: number;
  stock?: number;

  clear() {
    this.warehouseId = "";
    this.productId = "";
    this.price = undefined!;
    this.stock = undefined;
  }
}
