<script setup lang="ts">
import { computed, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useSelectionStore } from "@/stores/selection";

const userStore = useUserStore();
const selectionStore = useSelectionStore();

onMounted(async () => {
  await Promise.all([
    userStore.fetchCurrentUser(),
    selectionStore.fetchSelections(),
  ]);
});

const recentSelections = computed(() => selectionStore.selections.slice(0, 3));

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ru-RU").format(new Date(value));
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold text-neutral-900 mb-8">Личный кабинет</h1>

    <div class="grid grid-cols-2 gap-6">
      <div class="rounded-xl border border-neutral-200 bg-white p-5">
        <p class="text-sm font-medium text-neutral-900 mb-4">Мой профиль</p>
        <div class="space-y-3 text-sm">
          <div>
            <p class="text-neutral-500 text-xs">Имя</p>
            <p class="text-neutral-900">{{ userStore.currentUser?.name }}</p>
          </div>
          <div>
            <p class="text-neutral-500 text-xs">Телефон</p>
            <p class="text-neutral-900">{{ userStore.currentUser?.phone }}</p>
          </div>
          <div>
            <p class="text-neutral-500 text-xs">Email</p>
            <p class="text-neutral-900">{{ userStore.currentUser?.email }}</p>
          </div>
        </div>
        <RouterLink
          to="/cabinet/settings"
          class="inline-block mt-4 px-4 py-2 rounded-lg bg-neutral-900 text-white text-sm hover:bg-neutral-800"
        >
          Редактировать
        </RouterLink>
      </div>

      <div class="rounded-xl border border-neutral-200 bg-white p-5">
        <p class="text-sm font-medium text-neutral-900 mb-4">Мои подборки</p>
        <img
          src="https://picsum.photos/seed/cabinet-selection/500/260"
          alt="Подборка"
          class="w-full rounded-lg object-cover mb-3"
        />
        <p class="text-sm text-neutral-900">
          {{ selectionStore.selections[0]?.title }}
        </p>
        <p class="text-xs text-neutral-500 mb-4">
          {{ selectionStore.selections[0]?.items.length }} материалов
        </p>
        <RouterLink
          to="/cabinet/selections"
          class="inline-block px-4 py-2 rounded-lg border border-neutral-200 text-neutral-900 text-sm hover:bg-neutral-50"
        >
          Перейти
        </RouterLink>
      </div>
    </div>

    <div class="mt-8">
      <p class="text-sm font-medium text-neutral-900 mb-4">
        Недавняя активность
      </p>
      <div
        class="rounded-xl border border-neutral-200 bg-white divide-y divide-neutral-100"
      >
        <div
          v-for="selection in recentSelections"
          :key="selection.id"
          class="flex items-center justify-between px-5 py-4 text-sm"
        >
          <span class="text-neutral-900">Подборка «{{ selection.title }}»</span>
          <span class="text-neutral-500">{{
            formatDate(selection.createdAt)
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
