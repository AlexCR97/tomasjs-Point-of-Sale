<script setup lang="ts">
import {
  CreateWarehouseRequest,
  WarehouseModel,
  UpdateWarehouseRequest,
  WarehouseStore,
} from "@/api/warehouses";
import CrudView from "@/components/CrudView.vue";
import type {
  DatabaseFilters,
  DatabaseLoadFunction,
} from "@/components/database";
import { useWarehouseSelect } from "@/components/warehouse-select";
import { FilterMatchMode } from "primevue/api";
import InputText from "primevue/inputtext";
import { ref } from "vue";

const store = new WarehouseStore();
const warehouseSelect = useWarehouseSelect();
const createRequest = ref(new CreateWarehouseRequest());
const updateRequest = ref(new UpdateWarehouseRequest());

const loadResourcesFunction: DatabaseLoadFunction<
  WarehouseModel
> = async () => {
  return await store.findAsync();
};

const createResourceFunction = async () => {
  await store.createAsync(createRequest.value);
  createRequest.value.clear();
  warehouseSelect.loadWarehousesAsync();
};

const deleteResourceFunction = async (id: string) => {
  await store.deleteAsync(id);
};

const deleteResourcesFunction = async (ids: string[]) => {
  for (const id of ids) {
    await store.deleteAsync(id);
  }
};

const updateResourceFunction = async (resource: WarehouseModel) => {
  await store.updateAsync(resource._id, updateRequest.value);
  updateRequest.value.clear();
};

const detailsFormPanelMapFunction = (resource: WarehouseModel) => {
  updateRequest.value.id = resource._id;
  updateRequest.value.name = resource.name;
};

const filters = ref<DatabaseFilters<WarehouseModel>>({
  _id: {
    matchMode: FilterMatchMode.EQUALS,
  },
  name: {
    matchMode: FilterMatchMode.CONTAINS,
  },
});
</script>

<template>
  <div>
    <CrudView
      resource-name="Warehouse"
      resource-name-plural="Warehouses"
      :load-resources-function="loadResourcesFunction"
      :create-resource-function="createResourceFunction"
      :delete-resource-function="deleteResourceFunction"
      :delete-resources-function="deleteResourcesFunction"
      :update-resource-function="updateResourceFunction"
      :details-form-panel-map-function="detailsFormPanelMapFunction"
      v-model:filters="filters"
    >
      <template #createForm>
        <div class="p-float-label">
          <InputText
            id="createUsername"
            class="w-full"
            type="text"
            v-model="createRequest.name"
          />
          <label for="createUsername">Name</label>
        </div>
      </template>
      <template #detailsForm="{ resourceId }">
        <div class="p-float-label mb-6">
          <InputText
            id="resourceId"
            class="w-full"
            readonly
            type="text"
            :model-value="resourceId"
          />
          <label for="resourceId">ID</label>
        </div>
        <div class="p-float-label">
          <InputText
            id="updateUsername"
            class="w-full"
            type="text"
            v-model="updateRequest.name"
          />
          <label for="updateUsername">Name</label>
        </div>
      </template>
    </CrudView>
  </div>
</template>
