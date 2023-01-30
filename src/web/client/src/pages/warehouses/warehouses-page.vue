<script setup lang="ts">
import { CreateWarehouseRequest } from "@/api/warehouses";
import { WarehouseStore } from "@/api/warehouses/warehouse.store";
import { useLoader } from "@/components/loader";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Sidebar from "primevue/sidebar";
import { onMounted, ref } from "vue";

// const warehouseStore = useWarehouseStore();
const warehouseStore = new WarehouseStore();
const loader = useLoader();
const showAddSidebar = ref(false);
const request = ref(new CreateWarehouseRequest());

onMounted(() => {});

function onAdd() {
  showAddSidebar.value = true;
}

function onAddConfirm() {
  loader.show();

  setTimeout(() => {
    warehouseStore
      .createAsync(request.value)
      .then(() => {
        showAddSidebar.value = false;
        loader.hide();
      })
      .catch(() => {
        loader.hide();
      });
  }, 1000);
}
</script>

<template>
  <div>
    <p>Warehouses</p>

    <Button @click="onAdd">Add Warehouse</Button>

    <Sidebar
      v-model:visible="showAddSidebar"
      class="p-sidebar-md"
      :baseZIndex="10000"
      :dismissable="false"
      :show-close-icon="false"
      position="right"
    >
      <template #header>
        <h3 class="m-0">Add Warehouse</h3>
      </template>
      <div class="border-top-1 border-300 py-5">
        <div class="p-float-label">
          <InputText
            id="username"
            class="w-full"
            type="text"
            v-model="request.name"
          />
          <label for="username">Name</label>
        </div>
      </div>

      <div class="flex justify-content-end">
        <Button @click="onAddConfirm">Confirm</Button>
      </div>
    </Sidebar>
  </div>
</template>
