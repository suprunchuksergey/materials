<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import { User, ListOrdered, Heart, Settings, LogOut } from "lucide-vue-next";

const route = useRoute();

const items = [
  { label: "Мой профиль", to: "/cabinet", icon: User },
  { label: "Мои подборки", to: "/cabinet/selections", icon: ListOrdered },
  { label: "Избранное", to: "/cabinet/favorites", icon: Heart },
  { label: "Настройки", to: "/cabinet/settings", icon: Settings },
];
</script>

<template>
  <aside class="space-y-1">
    <RouterLink
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors"
      :class="
        route.path === item.to
          ? 'bg-neutral-900 text-white'
          : 'text-neutral-700 hover:bg-neutral-100'
      "
    >
      <component :is="item.icon" :size="16" />
      {{ item.label }}
    </RouterLink>
    <button
      class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-neutral-500 hover:bg-neutral-100"
    >
      <LogOut :size="16" />
      Выход
    </button>
  </aside>
</template>
