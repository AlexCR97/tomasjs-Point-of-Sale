<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import Toolbar from "primevue/toolbar";
import { computed, onMounted } from "vue";
import {
  onBeforeRouteUpdate,
  useRoute,
  type RouteLocationNormalized,
} from "vue-router";
import { usePageHeader } from "./page-header.store";

const route = useRoute();
const pageHeader = usePageHeader();
const pageTitle = computed(() => pageHeader.title);
const pageSubtitle = computed(() => pageHeader.subtitle);

onBeforeRouteUpdate((to) => {
  setPageHeaderDataFromRoute(to);
});

onMounted(() => {
  setPageHeaderDataFromRoute(route);
});

function setPageHeaderDataFromRoute(route: RouteLocationNormalized) {
  pageHeader.setTitle(
    (route.meta?.title as string) ?? route.name?.toString() ?? route.path
  );

  pageHeader.setSubtitle(route.meta?.subtitle as string);
}
</script>

<template>
  <Toolbar>
    <template #start>
      <div>
        <h3 class="m-0">{{ pageTitle }}</h3>
        <h4 v-if="pageSubtitle" class="m-0">{{ pageSubtitle }}</h4>
      </div>
    </template>
  </Toolbar>
</template>
