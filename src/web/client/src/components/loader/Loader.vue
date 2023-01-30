<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import BlockUI from "primevue/blockui";
import { computed, onMounted } from "vue";
import { useLoader } from "./loader.store";

const loader = useLoader();
const isLoading = computed(() => loader.isLoading);

onMounted(() => {
  console.log("mounted");
});
</script>

<template>
  <BlockUI :blocked="isLoading" :fullScreen="true" />
</template>
