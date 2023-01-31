<script setup lang="ts">
import { CreateWarehouseRequest, WarehouseModel } from "@/api/warehouses";
import { WarehouseStore } from "@/api/warehouses/warehouse.store";
import type { ContextAction } from "@/components/core";
import type {
  DatabaseColumn,
  DatabaseFilters,
  DatabaseLoadFunction,
  IDatabase,
} from "@/components/database";
import type { BulkAction } from "@/components/database/BulkAction";
import Database from "@/components/database/Database.vue";
import { useLoader } from "@/components/loader";
import { FilterMatchMode } from "primevue/api";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Sidebar from "primevue/sidebar";
import { onMounted, ref } from "vue";
import WarehousesTable from "./WarehousesTable.vue";

const warehouseStore = new WarehouseStore();
const loader = useLoader();
const showAddSidebar = ref(false);
const request = ref(new CreateWarehouseRequest());
const warehouses = ref<WarehouseModel[]>([]);

const databaseRef = ref<IDatabase>();

const databaseActions = ref<ContextAction[]>([
  {
    label: "Add Warehouse",
    action: () => onAdd(),
  },
  {
    label: "Refresh",
    action: () => databaseRef.value?.loadTableAsync(),
  },
]);

const databaseBulkActions = ref<BulkAction<WarehouseModel>[]>([
  {
    label: "Delete Selected",
    action: (selectedModels) => {
      console.log("Delete Selected", selectedModels);
      return true;
    },
  },
]);

const databaseColumns = ref<DatabaseColumn<WarehouseModel>[]>([
  {
    header: "ID",
    field: "_id",
  },
  {
    header: "Name",
    field: "name",
  },
]);

const databaseFilters = ref<DatabaseFilters<WarehouseModel>>({
  _id: {
    matchMode: FilterMatchMode.EQUALS,
  },
  name: {
    matchMode: FilterMatchMode.CONTAINS,
  },
});

const databaseMainRowActions = ref<ContextAction<WarehouseModel>[]>([
  {
    label: "View",
    action: (warehouse) => {
      console.log("View", warehouse);
    },
  },
  {
    label: "Delete",
    action: (warehouse) => {
      console.log("Delete", warehouse);
    },
  },
]);

const databaseSecondaryRowActions = ref<ContextAction<WarehouseModel>[]>([
  {
    label: "View",
    action: (warehouse) => {
      console.log("View", warehouse);
    },
  },
  {
    label: "Delete",
    action: (warehouse) => {
      console.log("Delete", warehouse);
    },
  },
]);

const databaseLoadFunction = ref<DatabaseLoadFunction<WarehouseModel>>(
  async () => {
    return await warehouseStore.findAsync();
  }
);

const databaseSelectedRows = ref<WarehouseModel[]>([]);

onMounted(() => {
  loadResourcesAsync();
});

async function loadResourcesAsync() {
  loader.show();

  try {
    warehouses.value = await warehouseStore.findAsync();
  } finally {
    loader.hide();
  }
}

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
  <div class="py-3">
    <Database
      ref="databaseRef"
      class="mb-6"
      :actions="databaseActions"
      :bulk-actions="databaseBulkActions"
      :columns="databaseColumns"
      :load="databaseLoadFunction"
      :row-actions="databaseMainRowActions"
      :secondary-row-actions="databaseSecondaryRowActions"
      v-model:filters="databaseFilters"
      v-model:selected-rows="databaseSelectedRows"
    />

    <WarehousesTable />

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
