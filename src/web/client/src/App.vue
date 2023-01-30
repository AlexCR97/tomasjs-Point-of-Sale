<script setup lang="ts">
import Loader from "@/components/loader/Loader.vue";
import { RouterView } from "vue-router";
import { onMounted } from "vue";

onMounted(() => {
  console.log("mounted");
});
</script>

<template>
  <div>
    <Loader />
    <RouterView />
  </div>
</template>
