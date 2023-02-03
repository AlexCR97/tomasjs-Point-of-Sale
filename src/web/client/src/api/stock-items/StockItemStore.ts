import { BaseApiStore } from "../core";
import type { CreateStockItemRequest } from "./CreateStockItemRequest";
import type { StockItemModel } from "./StockItemModel";
import type { UpdateStockItemRequest } from "./UpdateStockItemRequest";

export class StockItemStore extends BaseApiStore<
  StockItemModel,
  CreateStockItemRequest,
  UpdateStockItemRequest
> {
  constructor() {
    super("api/stock-items");
  }
}
