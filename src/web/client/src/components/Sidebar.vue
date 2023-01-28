<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { PrimeIcons } from "primevue/api";
import type { MenuItem } from "primevue/menuitem";
import PanelMenu from "primevue/panelmenu";
import { ref } from "vue";
import WarehouseSelect from "@/components/warehouse-select/WarehouseSelect.vue";

const standaloneItems = ref<MenuItem[]>([
  {
    icon: PrimeIcons.BOX,
    label: "Products",
    to: { name: "products" },
  },
  {
    icon: PrimeIcons.DATABASE,
    label: "Warehouses",
    to: { name: "warehouses" },
  },
]);

const warehouseItems = ref<MenuItem[]>([
  {
    icon: PrimeIcons.SHOPPING_CART,
    label: "Stock",
  },
  {
    icon: PrimeIcons.DOLLAR,
    label: "Sales",
  },
  {
    icon: PrimeIcons.USER,
    label: "Customers",
  },
  {
    icon: PrimeIcons.USERS,
    label: "Users",
  },
]);
</script>

<template>
  <aside class="border-right-1 border-200 w-16rem h-full">
    <PanelMenu :model="standaloneItems" />
    <WarehouseSelect class="mx-3 my-4" />
    <PanelMenu :model="warehouseItems" />
  </aside>
</template>
