<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { PrimeIcons } from "primevue/api";
import Menubar from "primevue/menubar";
import type { MenuItem } from "primevue/menuitem";
import { ref } from "vue";
import UserMenu from "@/components/UserMenu.vue";

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
  <header>
    <Menubar :model="items">
      <template #end>
        <UserMenu />
      </template>
    </Menubar>
  </header>
</template>
