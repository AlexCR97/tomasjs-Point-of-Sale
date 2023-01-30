<script setup lang="ts">
import PageHeader from "@/components/page-header/PageHeader.vue";
import Sidebar from "@/components/Sidebar.vue";
import Topbar from "@/components/Topbar.vue";
import { onMounted } from "vue";
import { RouterView } from "vue-router";

onMounted(() => {
  console.log("mounted");
});
</script>

<template>
  <div class="flex h-screen">
    <aside class="border-right-1 border-200 w-16rem h-full">
      <Sidebar />
    </aside>
    <div class="flex flex-column w-full h-full">
      <Topbar />
      <div class="h-full overflow-y-auto">
        <PageHeader />
        <main class="px-3">
          <RouterView />
        </main>
      </div>
      <!-- <footer class="border-top-1 border-200">Footer</footer> -->
    </div>
  </div>
</template>
