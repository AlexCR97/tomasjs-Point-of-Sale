import { BaseApiStore } from "../core";
import type { CreateWarehouseRequest } from "./CreateWarehouseRequest";
import type { UpdateWarehouseRequest } from "./UpdateWarehouseRequest";
import type { WarehouseModel } from "./WarehouseModel";

export class WarehouseStore extends BaseApiStore<
  WarehouseModel,
  CreateWarehouseRequest,
  UpdateWarehouseRequest
> {
  constructor() {
    super("warehouses");
  }
}
