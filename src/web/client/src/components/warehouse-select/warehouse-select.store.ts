import { WarehouseStore, type WarehouseModel } from "@/api/warehouses";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useWarehouseSelect = defineStore("WarehouseSelect", () => {
  const key = "tomasjs:pos:selectedWarehouse";
  const store = new WarehouseStore();
  const warehouses = ref<WarehouseModel[]>([]);
  // const selectedWarehouse = ref<string | undefined>();

  return {
    warehouses,
    selectedWarehouse: computed<string>(() => {
      const warehouseId = localStorage.getItem(key);

      if (!warehouseId || warehouseId.trim().length === 0) {
        throw new Error("A warehouse has not been selected");
      }

      return warehouseId;
    }),
    selectedWarehouseOrDefault: computed<string | undefined>(() => {
      return localStorage.getItem(key) ?? undefined;
    }),
    async loadWarehousesAsync() {
      warehouses.value = await store.findAsync();
    },
    setSelectedWarehouse(value: string | undefined) {
      if (!value) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }

      window.location.reload();
    },
  };
});
