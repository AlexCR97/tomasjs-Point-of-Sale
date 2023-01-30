import { defineStore } from "pinia";
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

export const useWarehouseStore = defineStore("WarehouseStore", () => {
  return new WarehouseStore();
});
