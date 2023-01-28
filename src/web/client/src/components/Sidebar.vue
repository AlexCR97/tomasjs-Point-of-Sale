<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { PrimeIcons } from "primevue/api";
import type { MenuItem } from "primevue/menuitem";
import PanelMenu from "primevue/panelmenu";
import { ref } from "vue";

const items = ref<MenuItem[]>([
  {
    icon: PrimeIcons.BOX,
    label: "Products",
  },
  {
    icon: PrimeIcons.DATABASE,
    label: "Warehouses",
  },
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
    <PanelMenu :model="items" />
  </aside>
</template>
