export class UpdateStockItemCommand {
  constructor(readonly id: string, readonly price: number, readonly stock?: number) {}
}
