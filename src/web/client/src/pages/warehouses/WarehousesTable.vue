<script setup lang="ts">
import type { WarehouseModel } from "@/api/warehouses";
import { WarehouseStore } from "@/api/warehouses/warehouse.store";
import { FilterMatchMode } from "primevue/api";
import Button from "primevue/button";
import Column from "primevue/column";
import ContextMenu from "primevue/contextmenu";
import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import SplitButton from "primevue/splitbutton";
import { onMounted, ref } from "vue";
import type { MenuItem } from "primevue/menuitem";

const warehouseStore = new WarehouseStore();
const loading = ref(false);
const tableData = ref<WarehouseModel[]>([]);

const tableColumns = ref([
  {
    header: "ID",
    field: "_id",
  },
  {
    header: "Name",
    field: "name",
  },
]);

const tableFilters = ref({
  _id: {
    value: undefined,
    matchMode: FilterMatchMode.EQUALS,
  },
  name: {
    value: undefined,
    matchMode: FilterMatchMode.CONTAINS,
  },
});

const contextMenuRef = ref();
const contextMenuModel = ref<MenuItem[]>([
  {
    label: "View",
    icon: "pi pi-fw pi-search",
    command: () => {
      console.log("View", selectedContextMenuRow.value);
    },
  },
  {
    label: "Delete",
    icon: "pi pi-fw pi-times",
    command: () => {
      console.log("Delete", selectedContextMenuRow.value);
    },
  },
]);
const selectedContextMenuRow = ref<any>();

const selectedRows = ref([]);

const rowActionsMenuRef = ref();

const mainRowActionItems = ref<MenuItem[]>([
  {
    label: "View",
    icon: "pi pi-fw pi-search",
    command: ($event) => {
      console.log("View", $event);
    },
  },
  {
    label: "Delete",
    icon: "pi pi-fw pi-times",
    command: ($event) => {
      console.log("Delete", $event);
    },
  },
]);

const secondaryRowActionItems = ref<MenuItem[]>([
  {
    label: "View",
    icon: "pi pi-fw pi-search",
    command: ($event) => {
      console.log("View", $event);
    },
  },
  {
    label: "Delete",
    icon: "pi pi-fw pi-times",
    command: ($event) => {
      console.log("Delete", $event);
    },
  },
]);

onMounted(() => {
  loadResourcesAsync();
});

function onRowContextMenu(event: any) {
  console.log("onRowContextMenu", event);
  contextMenuRef.value.show(event.originalEvent);
  // this.$refs.cm.show(event.originalEvent);
}

function onRowAction(index: number) {
  console.log("onRowAction", index);
  console.log(rowActionsMenuRef.value);
}

async function loadResourcesAsync() {
  loading.value = true;

  try {
    tableData.value = await warehouseStore.findAsync();
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <DataTable
    contextMenu
    dataKey="_id"
    :loading="loading"
    filterDisplay="row"
    :paginator="true"
    :rows="10"
    :value="tableData"
    v-model:contextMenuSelection="selectedContextMenuRow"
    v-model:filters="tableFilters"
    v-model:selection="selectedRows"
    @row-contextmenu="onRowContextMenu"
  >
    <Column selectionMode="multiple"></Column>

    <Column
      v-for="column of tableColumns"
      :key="column.field"
      :field="column.field"
      :header="column.header"
      :sortable="true"
    >
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          type="text"
          v-model="filterModel.value"
          @keydown.enter="filterCallback()"
          class="p-column-filter"
          :placeholder="`${column.header} ${filterModel.matchMode}`"
        />
      </template>
    </Column>

    <Column header="Actions">
      <template #body="{}">
        <SplitButton
          :model="secondaryRowActionItems"
          class="bg-primary border-round"
        >
          <Button v-for="(action, index) in mainRowActionItems" :key="index">
            {{ action.label }}
          </Button>
        </SplitButton>
      </template>
    </Column>
  </DataTable>

  <ContextMenu :model="contextMenuModel" ref="contextMenuRef" />
</template>
