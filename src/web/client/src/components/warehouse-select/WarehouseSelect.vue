<script setup lang="ts">
import Dropdown from "primevue/dropdown";
import { computed, ref } from "vue";
import { useWarehouseSelect } from "./warehouse-select.store";

const warehouseSelect = useWarehouseSelect();

const warehouses = ref<any[]>([
  { id: "1", name: "Warehouse 1" },
  { id: "2", name: "Warehouse 2" },
  { id: "3", name: "Warehouse 3" },
]);

const selectedWarehouse = computed({
  get: () => warehouseSelect.selectedWarehouse,
  set: (value: string | undefined) =>
    (warehouseSelect.selectedWarehouse = value),
});
</script>

<template>
  <div>
    <p class="font-bold m-0 mb-2">Selected Warehouse</p>
    <Dropdown
      v-model="selectedWarehouse"
      class="w-full"
      :options="warehouses"
      optionLabel="name"
      optionValue="id"
      placeholder="Select a Warehouse"
    />
  </div>
</template>
