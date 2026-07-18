<script setup lang="ts">
import { RouterLink } from "vue-router";
import { Search, User, Heart, ShoppingBag } from "lucide-vue-next";
import { useSelectionStore } from "@/stores/selection";

const selectionStore = useSelectionStore();

const navItems = [
  { label: "Каталог", to: "/catalog" },
  { label: "Конструктор", to: "/constructor" },
  { label: "О компании", to: "/about" },
  { label: "Контакты", to: "/contacts" },
];
</script>

<template>
  <header class="border-b border-neutral-200 bg-white">
    <div class="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
      <RouterLink
        to="/"
        class="text-lg font-semibold tracking-tight text-neutral-900"
      >
        BuildChoice
      </RouterLink>

      <nav class="flex items-center gap-8">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
          active-class="text-neutral-900 font-medium"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="flex items-center gap-4 text-neutral-700">
        <button
          class="hover:text-neutral-900 transition-colors"
          aria-label="Поиск"
        >
          <Search :size="18" />
        </button>
        <RouterLink
          to="/cabinet"
          class="hover:text-neutral-900 transition-colors"
          aria-label="Профиль"
        >
          <User :size="18" />
        </RouterLink>
        <RouterLink
          to="/cabinet/favorites"
          class="hover:text-neutral-900 transition-colors"
          aria-label="Избранное"
        >
          <Heart :size="18" />
        </RouterLink>
        <RouterLink
          to="/constructor"
          class="relative hover:text-neutral-900 transition-colors"
          aria-label="Подборка"
        >
          <ShoppingBag :size="18" />
          <span
            v-if="selectionStore.currentItems.length"
            class="absolute -top-2 -right-2 bg-neutral-900 text-white text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center"
          >
            {{ selectionStore.currentItems.length }}
          </span>
        </RouterLink>


        <RouterLink
            to="/admin"
            class="hover:text-neutral-900 transition-colors"
            aria-label="Админ панель"
        >
          Админ панель
        </RouterLink>
      </div>
    </div>
  </header>
</template>
