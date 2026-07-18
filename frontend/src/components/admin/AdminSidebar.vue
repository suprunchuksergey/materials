<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import {
  LayoutDashboard,
  Boxes,
  FolderTree,
  ClipboardList,
} from "lucide-vue-next";

const route = useRoute();

const items = [
  { label: "Панель управления", to: "/admin", icon: LayoutDashboard },
  { label: "Материалы", to: "/admin/materials", icon: Boxes },
  { label: "Категории", to: "/admin/categories", icon: FolderTree },
  { label: "Заказы", to: "/admin/orders", icon: ClipboardList },
];
</script>

<template>
  <aside class="w-60 shrink-0 bg-neutral-950 text-neutral-300 flex flex-col">
    <div
      class="h-16 flex items-center px-6 text-white font-semibold tracking-tight"
    >
      BuildChoice Admin
    </div>
    <nav class="flex-1 px-3 space-y-1">
      <RouterLink
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors"
        :class="
          route.path === item.to
            ? 'bg-white text-neutral-900'
            : 'hover:bg-neutral-900 hover:text-white'
        "
      >
        <component :is="item.icon" :size="16" />
        {{ item.label }}
      </RouterLink>
    </nav>
  </aside>
</template>
