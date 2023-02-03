import { useWarehouseGuard } from "@/guards";
import { createRouter, createWebHistory } from "vue-router";

export const Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/admin/warehouses",
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../pages/admin/home-page.vue"),
      children: [
        {
          path: "/admin",
          redirect: "/admin/warehouses",
        },
        {
          path: "/admin/warehouses",
          name: "warehouses",
          meta: {
            title: "Warehouses",
          },
          component: () =>
            import("../pages/admin/warehouses/warehouses-page.vue"),
        },
        {
          path: "/admin/warehouse-not-selected",
          name: "warehouse-not-selected",
          meta: {
            title: "Warehouse Not Selected!",
          },
          component: () => import("../pages/admin/warehouse-not-selected.vue"),
        },
        {
          path: "/admin/products",
          name: "products",
          meta: {
            title: "Products",
          },
          component: () => import("../pages/admin/products/products-page.vue"),
        },
        {
          path: "/admin/stock-items",
          name: "stock-items",
          meta: {
            title: "Stock",
          },
          beforeEnter: useWarehouseGuard(),
          component: () =>
            import("../pages/admin/stock-items/stock-items-page.vue"),
        },
      ],
    },
  ],
});
