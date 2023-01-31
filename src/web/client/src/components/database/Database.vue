<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import Button from "primevue/button";
import Card from "primevue/card";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import SplitButton from "primevue/splitbutton";
import { computed, onMounted, ref } from "vue";
import type { DatabaseColumn } from "./DatabaseColumn";
import type { DatabaseFilters } from "./DatabaseFilters";
import type { DatabaseLoadFunction } from "./DatabaseLoadFunction";
import type { ContextAction } from "../core";
import type { MenuItem } from "primevue/menuitem";
import type { IDatabase } from "./IDatabase";
import type { BulkAction } from "./BulkAction";

const props = withDefaults(
  defineProps<{
    columns?: DatabaseColumn<any>[];
    filters?: DatabaseFilters<any>;
    primaryKey?: string;
    rowActions?: ContextAction<any>[];
    secondaryRowActions?: ContextAction<any>[];
    selectedRows?: any[];
    actions?: ContextAction[];
    bulkActions?: BulkAction<any>[];
    load?: DatabaseLoadFunction<any>;
  }>(),
  {
    columns: () => [],
    rowActions: () => [],
    secondaryRowActions: () => [],
    selectedRows: () => [],
    actions: () => [],
    bulkActions: () => [],
  }
);

const emit = defineEmits<{
  (e: "update:filters", value: DatabaseFilters<any> | undefined): void;
  (e: "update:selectedRows", value: any[] | undefined): void;
}>();

defineExpose<IDatabase>({
  loadTableAsync,
});

const tableData = ref<any[]>([]);
const loadingData = ref(false);

const tableFilters = computed<any>({
  get: () => props.filters,
  set: (value: DatabaseFilters<any> | undefined) =>
    emit("update:filters", value),
});

const selectedRows = computed({
  get: () => props.selectedRows,
  set: (value: any[] | undefined) => emit("update:selectedRows", value),
});

const mainRowActionsMap = ref(new Map<number, ContextAction<any>[]>());
const secondaryRowActionsMap = ref(new Map<number, MenuItem[]>());

const menuItemsFactory = (item: any, actions: ContextAction[]): MenuItem[] => {
  if (!actions) {
    return [];
  }

  return actions.map((contextAction) => ({
    icon: contextAction.icon,
    label: contextAction.label,
    separator: contextAction.separator,
    command: () => {
      if (!contextAction.action) {
        return;
      }

      contextAction.action(item);
    },
    disabled: () => {
      if (!contextAction.disabled) {
        return false;
      }

      return contextAction.disabled(item);
    },
    visible: () => {
      if (!contextAction.hidden) {
        return true;
      }

      return !contextAction.hidden(item);
    },
  }));
};

onMounted(async () => {
  loadTableAsync();
});

async function loadTableAsync(): Promise<any[]> {
  const tableData = await loadDataAsync();
  loadMainRowActions();
  loadSecondaryRowActions();
  return tableData;
}

async function loadDataAsync(): Promise<any[]> {
  if (!props.load) {
    return [];
  }

  loadingData.value = true;

  try {
    tableData.value = await props.load();
    return tableData.value;
  } finally {
    loadingData.value = false;
  }
}

function loadMainRowActions() {
  mainRowActionsMap.value.clear();

  tableData.value.forEach((_, index) => {
    mainRowActionsMap.value.set(index, props.rowActions);
  });
}

function loadSecondaryRowActions() {
  secondaryRowActionsMap.value.clear();

  tableData.value.forEach((item, index) => {
    const menuItems = menuItemsFactory(item, props.rowActions);
    secondaryRowActionsMap.value.set(index, menuItems);
  });
}

async function onBulkAction(action: BulkAction<any>) {
  if (!action.action) {
    return;
  }

  const shouldClearSelectedRows = await action.action(selectedRows.value);

  if (shouldClearSelectedRows) {
    selectedRows.value = [];
  }
}
</script>

<template>
  <Card class="border-50">
    <template #header v-if="props.actions">
      <div class="flex border-bottom-1 border-200 surface-50 p-2">
        <Button
          v-for="(action, index) in props.bulkActions"
          class="ml-2"
          :key="index"
          @click="onBulkAction(action)"
        >
          {{ action.label }}
        </Button>

        <div class="mx-auto"></div>

        <Button
          v-for="(action, index) in props.actions"
          class="ml-2"
          :key="index"
          @click="action.action ? action.action() : undefined"
        >
          {{ action.label }}
        </Button>
      </div>
    </template>
    <template #content>
      <DataTable
        :dataKey="props.primaryKey"
        :loading="loadingData"
        filterDisplay="row"
        :paginator="true"
        :rows="10"
        :value="tableData"
        v-model:filters="tableFilters"
        v-model:selection="selectedRows"
      >
        <Column selectionMode="multiple"></Column>

        <Column
          v-for="column of props.columns"
          :key="column.field"
          :field="(column.field as any)"
          :header="column.header"
          :sortable="true"
        >
          <template
            v-if="props.filters"
            #filter="{ filterModel, filterCallback }"
          >
            <InputText
              type="text"
              v-model="filterModel.value"
              @keydown.enter="filterCallback()"
              class="p-column-filter"
              :placeholder="`${column.header} ${filterModel.matchMode}`"
            />
          </template>
        </Column>

        <Column>
          <template #body="{ data, index: rowIndex }">
            <SplitButton
              :model="secondaryRowActionsMap.get(rowIndex)"
              class="bg-primary border-round"
            >
              <Button
                v-for="(action, actionIndex) in mainRowActionsMap.get(rowIndex)"
                :key="actionIndex"
                @click="action.action ? action.action(data) : undefined"
              >
                {{ action.label }}
              </Button>
            </SplitButton>
          </template>
        </Column>

        <template #empty>
          <p class="text-center">No records found</p>
        </template>
      </DataTable>
    </template>
  </Card>
</template>
