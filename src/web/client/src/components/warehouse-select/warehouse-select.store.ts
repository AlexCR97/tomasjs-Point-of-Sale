import { WarehouseStore, type WarehouseModel } from "@/api/warehouses";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useWarehouseSelect = defineStore("WarehouseSelect", () => {
  const store = new WarehouseStore();
  const warehouses = ref<WarehouseModel[]>([]);
  const selectedWarehouse = ref<string | undefined>();

  return {
    warehouses,
    selectedWarehouse,
    async loadWarehousesAsync() {
      warehouses.value = await store.findAsync();
    },
  };
});
