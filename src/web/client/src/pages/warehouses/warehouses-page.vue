<script setup lang="ts">
import { CreateWarehouseRequest, WarehouseModel } from "@/api/warehouses";
import { WarehouseStore } from "@/api/warehouses/warehouse.store";
// import type { ContextAction } from "@/components/core";
import type {
  DatabaseColumn,
  DatabaseFilters,
  DatabaseLoadFunction,
  IDatabase,
  RowPrimaryAction,
  RowSecondaryAction,
  TableAction,
  TableBulkAction,
} from "@/components/database";
import Database from "@/components/database/Database.vue";
import { useLoader } from "@/components/loader";
import { FilterMatchMode } from "primevue/api";
import Button from "primevue/button";
import ConfirmDialog from "primevue/confirmdialog";
import InputText from "primevue/inputtext";
import Sidebar from "primevue/sidebar";
import Toast from "primevue/toast";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";

const warehouseStore = new WarehouseStore();
const loader = useLoader();
const confirm = useConfirm();
const toast = useToast();
const showAddSidebar = ref(false);
const request = ref(new CreateWarehouseRequest());

const databaseRef = ref<IDatabase>();

const databaseBulkActions = ref<TableBulkAction<WarehouseModel>[]>([
  {
    label: "Delete Selected",
    action: (selectedModels) => {
      return new Promise<boolean>((resolve) => {
        confirm.require({
          message: "Are you sure you want to delete the selected warehouses?",
          accept: () =>
            deleteResourcesAsync(selectedModels.map((x) => x._id))
              .then(() => resolve(true))
              .catch(() => resolve(false)),
        });
      });
    },
  },
]);

const databaseActions = ref<TableAction[]>([
  {
    label: "Add Warehouse",
    action: () => onAdd(),
  },
  {
    label: "Refresh",
    action: () => databaseRef.value?.loadTableAsync(),
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

const databaseMainRowActions = ref<RowPrimaryAction<WarehouseModel>[]>([
  {
    label: "View",
    action: (warehouse) => {
      console.log("View", warehouse);
    },
  },
]);

const databaseSecondaryRowActions = ref<RowSecondaryAction<WarehouseModel>[]>([
  {
    label: "Delete",
    action: (warehouse) => {
      confirm.require({
        message: `Are you sure you want to delete the warehouse "${warehouse.name}"`,
        accept: () => deleteResourceAsync(warehouse._id),
      });
    },
  },
]);

const databaseLoadFunction = ref<DatabaseLoadFunction<WarehouseModel>>(
  async () => {
    return await warehouseStore.findAsync();
  }
);

const databaseSelectedRows = ref<WarehouseModel[]>([]);

async function deleteResourceAsync(id: string) {
  loader.show();

  try {
    await warehouseStore.deleteAsync(id);

    toast.add({
      severity: "success",
      summary: "Warehouse deleted",
    });

    databaseRef.value?.loadTableAsync();
  } finally {
    loader.hide();
  }
}

async function deleteResourcesAsync(ids: string[]) {
  loader.show();

  try {
    for (const id of ids) {
      await warehouseStore.deleteAsync(id);
    }

    toast.add({
      severity: "success",
      summary: "Warehouses deleted",
    });

    databaseRef.value?.loadTableAsync();
  } finally {
    loader.hide();
  }
}

function onAdd() {
  showAddSidebar.value = true;
}

function onAddCancel() {
  showAddSidebar.value = false;
  request.value.clear();
}

async function onAddConfirm() {
  loader.show();

  try {
    await warehouseStore.createAsync(request.value);
    showAddSidebar.value = false;
    databaseRef.value?.loadTableAsync();
  } finally {
    loader.hide();
  }
}
</script>

<template>
  <div class="py-3">
    <ConfirmDialog></ConfirmDialog>

    <Toast />

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
      <div class="border-top-1 border-200 py-5">
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
        <Button @click="onAddCancel" class="p-button-sm p-button-outlined">
          Cancel
        </Button>
        <Button @click="onAddConfirm" class="p-button-sm ml-2">Confirm</Button>
      </div>
    </Sidebar>
  </div>
</template>
