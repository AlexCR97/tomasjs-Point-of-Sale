import { defineStore } from "pinia";
import { ref } from "vue";

export const useWarehouseSelect = defineStore("WarehouseSelect", () => {
  const selectedWarehouse = ref<string | undefined>();

  return {
    selectedWarehouse,
  };
});
