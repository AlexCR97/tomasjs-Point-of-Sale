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
      component: () => import("../pages/home-page.vue"),
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
          component: () => import("../pages/warehouses/warehouses-page.vue"),
        },
        {
          path: "/admin/products",
          name: "products",
          meta: {
            title: "Products",
          },
          component: () => import("../pages/products/products-page.vue"),
        },
      ],
    },
  ],
});
