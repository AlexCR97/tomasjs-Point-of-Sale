<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import Topbar from "@/components/Topbar.vue";
</script>

<template>
  <div class="flex h-screen">
    <aside class="border-right-1 border-200 w-16rem h-full">
      <Sidebar />
    </aside>
    <div class="flex flex-column w-full h-full">
      <Topbar />
      <main class="h-full overflow-y-auto">
        <RouterView />
      </main>
      <!-- <footer class="border-top-1 border-200">Footer</footer> -->
    </div>
  </div>
</template>
