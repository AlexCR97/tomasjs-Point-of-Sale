<script setup lang="ts">
import { PrimeIcons } from "primevue/api";
import Avatar from "primevue/avatar";
import Menu from "primevue/menu";
import type { MenuItem } from "primevue/menuitem";
import { ref } from "vue";

const menuRef = ref();

const menuItems = ref<MenuItem[]>([
  {
    icon: PrimeIcons.USER,
    label: "My Profile",
    // to: { name: "my-profile" },
  },
  {
    icon: PrimeIcons.SIGN_OUT,
    label: "Logout",
    command: ($ev) => {
      console.log("$ev", $ev);
    },
  },
]);
</script>

<template>
  <div class="flex align-items-center">
    <div>
      <p class="text-right m-0 mr-2">username@domain.com</p>
      <p class="text-right m-0 mr-2">Administrator</p>
    </div>
    <div>
      <Avatar
        class="bg-primary cursor-pointer"
        label="PA"
        role="button"
        shape="circle"
        size="large"
        @click="menuRef?.toggle($event)"
      />
      <Menu ref="menuRef" :model="menuItems" popup />
    </div>
  </div>
</template>
