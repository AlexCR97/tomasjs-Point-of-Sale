export class CreateStockItemCommand {
  constructor(
    readonly warehouseId: string,
    readonly productId: string,
    readonly price: number,
    readonly stock?: number
  ) {}
}
