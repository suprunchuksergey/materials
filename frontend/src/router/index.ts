import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/layouts/PublicLayout.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/views/public/HomeView.vue"),
        },
        {
          path: "catalog",
          name: "catalog",
          component: () => import("@/views/public/CatalogView.vue"),
        },
        {
          path: "catalog/:id",
          name: "material-detail",
          component: () => import("@/views/public/MaterialDetailView.vue"),
        },
        {
          path: "constructor",
          name: "constructor",
          component: () => import("@/views/public/ConstructorView.vue"),
        },
        {
          path: "about",
          name: "about",
          component: () => import("@/views/public/AboutView.vue"),
        },
        {
          path: "contacts",
          name: "contacts",
          component: () => import("@/views/public/ContactsView.vue"),
        },
      ],
    },
    {
      path: "/cabinet",
      component: () => import("@/layouts/CabinetLayout.vue"),
      children: [
        {
          path: "",
          name: "cabinet-profile",
          component: () => import("@/views/cabinet/ProfileView.vue"),
        },
        {
          path: "selections",
          name: "cabinet-selections",
          component: () => import("@/views/cabinet/SelectionsHistoryView.vue"),
        },
        {
          path: "favorites",
          name: "cabinet-favorites",
          component: () => import("@/views/cabinet/FavoritesView.vue"),
        },
        {
          path: "settings",
          name: "cabinet-settings",
          component: () => import("@/views/cabinet/SettingsView.vue"),
        },
      ],
    },
    {
      path: "/admin",
      component: () => import("@/layouts/AdminLayout.vue"),
      children: [
        {
          path: "",
          name: "admin-dashboard",
          component: () => import("@/views/admin/DashboardView.vue"),
        },
        {
          path: "materials",
          name: "admin-materials",
          component: () => import("@/views/admin/MaterialsView.vue"),
        },
        {
          path: "materials/create",
          name: "admin-material-create",
          component: () => import("@/views/admin/MaterialFormView.vue"),
        },
        {
          path: "materials/:id/edit",
          name: "admin-material-edit",
          component: () => import("@/views/admin/MaterialFormView.vue"),
        },
        {
          path: "categories",
          name: "admin-categories",
          component: () => import("@/views/admin/CategoriesView.vue"),
        },
        {
          path: "orders",
          name: "admin-orders",
          component: () => import("@/views/admin/OrdersView.vue"),
        },
      ],
    },
  ],
});

export default router;
