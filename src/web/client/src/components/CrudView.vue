<script setup lang="ts">
import type { BaseModel } from "@/api/core";
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
import Button from "primevue/button";
import ConfirmDialog from "primevue/confirmdialog";
import Sidebar from "primevue/sidebar";
import Toast from "primevue/toast";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { computed, ref } from "vue";
import { useRouter, type RouteLocationRaw } from "vue-router";

type TResource<T extends BaseModel = BaseModel> = T;
type FormType = "panel" | "route" | "custom";

const props = withDefaults(
  defineProps<{
    // Resource metadata
    resourceName?: string;
    resourceNamePlural?: string;

    // Create Form
    createFormLayout: FormType;
    createFormRoute?: RouteLocationRaw;

    // Details Form
    detailsFormLayout: FormType;
    detailsFormRoute?: RouteLocationRaw;
    detailsFormPanelMapFunction?: (resource: any) => void | Promise<void>;

    // CRUD
    loadResourcesFunction?: DatabaseLoadFunction<TResource>;
    createResourceFunction?: () => Promise<void>;
    updateResourceFunction?: (resource: any) => Promise<void>;
    deleteResourceFunction?: (id: string) => Promise<void>;
    deleteResourcesFunction?: (ids: string[]) => Promise<void>;

    // Database
    filters?: DatabaseFilters<TResource>;
  }>(),
  {
    resourceName: "Resource",
    resourceNamePlural: "Resources",
    createFormLayout: "panel",
    detailsFormLayout: "panel",
    createResourceFunction: () => Promise.resolve(),
    updateResourceFunction: () => Promise.resolve(),
    deleteResourceFunction: () => Promise.resolve(),
    deleteResourcesFunction: () => Promise.resolve(),
  }
);

const emit = defineEmits<{
  (e: "create"): void;
  (e: "details", resource: TResource): void;
  (e: "update:filters", value: DatabaseFilters<TResource> | undefined): void;
}>();

const filters = computed({
  get: () => props.filters,
  set: (value: DatabaseFilters<TResource> | undefined) =>
    emit("update:filters", value),
});

const loader = useLoader();
const confirm = useConfirm();
const toast = useToast();
const router = useRouter();
const showCreateFormPanel = ref(false);
const showDetailsFormPanel = ref(false);
const selectedResource = ref<TResource | undefined>();
const ignoredSchemaKeys: (keyof BaseModel)[] = [
  "createdAt",
  "createdBy",
  "deletedAt",
  "deletedBy",
  "updatedAt",
  "updatedBy",
];

const databaseRef = ref<IDatabase>();

const databaseColumns = ref<DatabaseColumn<TResource>[]>([]);

const databaseLoadFunction: DatabaseLoadFunction<object> = async () => {
  if (!props.loadResourcesFunction) {
    return [];
  }

  const resources = await props.loadResourcesFunction();

  const resourcesSchemaKeys = resources
    .map(Object.keys) // Get the keys of all objects
    .reduce((accumulator, value) => accumulator.concat(value), []) // Flatten the array of arrays
    .filter((key, index, self) => index === self.indexOf(key)) // Remove duplicates
    .filter((key) => !ignoredSchemaKeys.includes(key as any)) // Remove the ignored keys
    .sort((a, b) => (a < b ? -1 : 1));

  databaseColumns.value = [];

  for (const key of resourcesSchemaKeys) {
    databaseColumns.value.push({
      header: key,
      field: key as any,
    });
  }

  return resources;
};

const tableActions = ref<TableAction[]>([
  {
    label: `Add ${props.resourceName}`,
    action: () => onAddResource(),
  },
  {
    label: "Refresh",
    action: () => databaseRef.value?.loadTableAsync(),
  },
]);

const tableBulkActions = ref<TableBulkAction<TResource>[]>([
  {
    label: "Delete Selected",
    action: (selectedResources) => {
      return new Promise<boolean>((resolve) => {
        confirm.require({
          message: `Are you sure you want to delete the selected ${props.resourceNamePlural}?`,
          accept: () => {
            const resourcesIds = selectedResources.map((x) => x._id);
            deleteResourcesAsync(resourcesIds)
              .then(() => resolve(true))
              .catch(() => resolve(false));
          },
        });
      });
    },
  },
]);

const databasePrimaryRowActions = ref<RowPrimaryAction<TResource>[]>([
  {
    label: "View",
    action: (resource) => onViewResource(resource),
  },
]);

const databaseSecondaryRowActions = ref<RowSecondaryAction<TResource>[]>([
  {
    label: "Delete",
    action: (resource) => {
      confirm.require({
        message: `Are you sure you want to delete the ${props.resourceName} "${resource._id}"`,
        accept: () => deleteResourceAsync(resource._id),
      });
    },
  },
]);

const databaseSelectedRows = ref<TResource[]>([]);

async function deleteResourceAsync(id: string) {
  loader.show();

  try {
    await props.deleteResourceFunction(id);

    toast.add({
      severity: "success",
      summary: `${props.resourceName} deleted`,
    });

    databaseRef.value?.loadTableAsync();
  } finally {
    loader.hide();
  }
}

async function deleteResourcesAsync(ids: string[]) {
  loader.show();

  try {
    await props.deleteResourcesFunction(ids);

    toast.add({
      severity: "success",
      summary: `${props.resourceName} deleted`,
    });

    databaseRef.value?.loadTableAsync();
  } finally {
    loader.hide();
  }
}

function onAddResource() {
  if (props.createFormLayout === "panel") {
    return (showCreateFormPanel.value = true);
  }

  if (props.createFormLayout === "route") {
    if (props.createFormRoute) {
      return router.push(props.createFormRoute);
    }
  }

  if (props.createFormLayout === "custom") {
    return emit("create");
  }
}

async function onViewResource(resource: TResource) {
  selectedResource.value = resource;

  if (props.detailsFormLayout === "panel") {
    props.detailsFormPanelMapFunction?.call(undefined, resource);
    showDetailsFormPanel.value = true;
    return;
  }

  if (props.detailsFormLayout === "route") {
    if (props.detailsFormRoute) {
      return router.push(props.detailsFormRoute);
    }
  }

  if (props.detailsFormLayout === "custom") {
    return emit("details", resource);
  }
}

function onAddCancel() {
  if (props.createFormLayout === "panel") {
    showCreateFormPanel.value = false;
    return;
  }
}

function onDetailsCancel() {
  if (props.detailsFormLayout === "panel") {
    showDetailsFormPanel.value = false;
    return;
  }
}

async function onAddConfirm() {
  loader.show();

  try {
    await props.createResourceFunction();

    if (props.createFormLayout === "panel") {
      showCreateFormPanel.value = false;
    }

    databaseRef.value?.loadTableAsync();
  } finally {
    loader.hide();
  }
}

async function onDetailsConfirm() {
  if (!selectedResource.value) {
    throw new Error(`The ref "selectedResource" is required`);
  }

  loader.show();

  try {
    await props.updateResourceFunction(selectedResource.value);

    if (props.detailsFormLayout === "panel") {
      showDetailsFormPanel.value = false;
    }

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
      :actions="tableActions"
      :bulk-actions="tableBulkActions"
      :columns="databaseColumns"
      :load="databaseLoadFunction"
      :row-actions="databasePrimaryRowActions"
      :secondary-row-actions="databaseSecondaryRowActions"
      v-model:filters="filters"
      v-model:selected-rows="databaseSelectedRows"
    />

    <Sidebar
      v-model:visible="showCreateFormPanel"
      class="p-sidebar-md"
      :baseZIndex="10000"
      :dismissable="false"
      :show-close-icon="false"
      position="right"
    >
      <template #header>
        <h3 class="m-0">Add {{ props.resourceName }}</h3>
      </template>
      <template #default>
        <div class="border-top-1 border-200 pt-5"></div>
        <slot name="createForm"></slot>
        <div class="flex justify-content-end mt-4">
          <Button @click="onAddCancel" class="p-button-sm p-button-outlined">
            Cancel
          </Button>
          <Button @click="onAddConfirm" class="p-button-sm ml-2">
            Confirm
          </Button>
        </div>
      </template>
    </Sidebar>

    <Sidebar
      v-model:visible="showDetailsFormPanel"
      class="p-sidebar-md"
      :baseZIndex="10000"
      :dismissable="false"
      :show-close-icon="false"
      position="right"
    >
      <template #header>
        <h3 class="m-0">{{ props.resourceName }} Details</h3>
      </template>
      <template #default>
        <div class="border-top-1 border-200 pt-5"></div>
        <slot name="detailsForm" :resourceId="selectedResource?._id"></slot>
        <div class="flex justify-content-end mt-4">
          <Button
            @click="onDetailsCancel"
            class="p-button-sm p-button-outlined"
          >
            Cancel
          </Button>
          <Button @click="onDetailsConfirm" class="p-button-sm ml-2">
            Confirm
          </Button>
        </div>
      </template>
    </Sidebar>
  </div>
</template>
