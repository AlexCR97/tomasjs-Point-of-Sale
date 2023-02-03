<script setup lang="ts">
import { ProductStore, type ProductModel } from "@/api/products";
import {
  CreateStockItemRequest,
  StockItemModel,
  StockItemStore,
  UpdateStockItemRequest,
} from "@/api/stock-items";
import CrudView from "@/components/CrudView.vue";
import type {
  DatabaseFilters,
  DatabaseLoadFunction,
} from "@/components/database";
import { useWarehouseSelect } from "@/components/warehouse-select";
import { FilterMatchMode } from "primevue/api";
import Dropdown from "primevue/dropdown";
import InputNumber from "primevue/inputnumber";
import { onMounted, ref } from "vue";

const store = new StockItemStore();
const productStore = new ProductStore();
const warehouseSelect = useWarehouseSelect();
const createRequest = ref(new CreateStockItemRequest());
const updateRequest = ref(new UpdateStockItemRequest());
const products = ref<ProductModel[]>([]);

onMounted(() => {
  productStore.findAsync().then((res) => (products.value = res));
});

const loadResourcesFunction: DatabaseLoadFunction<
  StockItemModel
> = async () => {
  return await store.findAsync();
};

const createResourceFunction = async () => {
  createRequest.value.warehouseId = warehouseSelect.selectedWarehouse;
  await store.createAsync(createRequest.value);
  createRequest.value.clear();
};

const deleteResourceFunction = async (id: string) => {
  await store.deleteAsync(id);
};

const deleteResourcesFunction = async (ids: string[]) => {
  for (const id of ids) {
    await store.deleteAsync(id);
  }
};

const updateResourceFunction = async (resource: StockItemModel) => {
  updateRequest.value.warehouseId = warehouseSelect.selectedWarehouse;
  await store.updateAsync(resource._id, updateRequest.value);
  updateRequest.value.clear();
};

const detailsFormPanelMapFunction = (resource: StockItemModel) => {
  updateRequest.value.warehouseId = resource.warehouseId;
  updateRequest.value.productId = resource.productId;
  updateRequest.value.id = resource._id;
  updateRequest.value.stock = resource.stock;
  updateRequest.value.price = resource.price;
};

const filters = ref<DatabaseFilters<StockItemModel>>({
  _id: {
    matchMode: FilterMatchMode.EQUALS,
  },
});
</script>

<template>
  <div>
    <CrudView
      resource-name="Stock"
      resource-name-plural="Stocks"
      :load-resources-function="loadResourcesFunction"
      :create-resource-function="createResourceFunction"
      :delete-resource-function="deleteResourceFunction"
      :delete-resources-function="deleteResourcesFunction"
      :update-resource-function="updateResourceFunction"
      :details-form-panel-map-function="detailsFormPanelMapFunction"
      v-model:filters="filters"
    >
      <template #createForm>
        <div class="p-float-label mb-6">
          <Dropdown
            v-model="createRequest.productId"
            class="w-full"
            :options="products"
            optionValue="_id"
            optionLabel="name"
            placeholder="Select a Product"
          />
          <label for="createProductId">Product</label>
        </div>
        <div class="p-float-label mb-6">
          <InputNumber
            id="createPrice"
            class="w-full"
            v-model="createRequest.price"
            mode="currency"
            :min="0"
            currency="USD"
            locale="en-US"
          />
          <label for="createPrice">Price</label>
        </div>
        <div class="p-float-label mb-6">
          <InputNumber
            id="createStock"
            class="w-full"
            v-model="createRequest.stock"
            :min="0"
          />
          <label for="createStock">Stock</label>
        </div>
      </template>
      <template #detailsForm> </template>
    </CrudView>
  </div>
</template>
