<script setup lang="ts">
import Dropdown from "primevue/dropdown";
import { computed } from "vue";
import { useWarehouseSelect } from "./warehouse-select.store";

const warehouseSelect = useWarehouseSelect();

const warehouses = computed(() => warehouseSelect.warehouses);

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
      optionValue="_id"
      optionLabel="name"
      placeholder="Select a Warehouse"
    />
  </div>
</template>
