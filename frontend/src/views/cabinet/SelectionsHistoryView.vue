<script setup lang="ts">
import { onMounted } from "vue";
import { RouterLink } from "vue-router";
import { MoreHorizontal } from "lucide-vue-next";
import { useSelectionStore } from "@/stores/selection";
import PageHeader from "@/components/common/PageHeader.vue";
import EmptyState from "@/components/common/EmptyState.vue";

const selectionStore = useSelectionStore();

onMounted(() => {
  selectionStore.fetchSelections();
});

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ru-RU").format(new Date(value));
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <PageHeader title="Мои подборки" />
      <RouterLink
        to="/constructor"
        class="px-4 py-2 rounded-lg bg-neutral-900 text-white text-sm hover:bg-neutral-800"
      >
        Создать новую
      </RouterLink>
    </div>

    <div v-if="selectionStore.selections.length" class="grid grid-cols-2 gap-5">
      <div
        v-for="selection in selectionStore.selections"
        :key="selection.id"
        class="rounded-xl border border-neutral-200 bg-white p-4 flex gap-4"
      >
        <img
          :src="`https://picsum.photos/seed/${selection.id}/200/200`"
          :alt="selection.title"
          class="w-20 h-20 rounded-lg object-cover"
        />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-neutral-900 truncate">
            {{ selection.title }}
          </p>
          <p class="text-xs text-neutral-500 mt-1">
            {{ selection.items.length }} материалов
          </p>
          <p class="text-xs text-neutral-400 mt-1">
            Обновлено {{ formatDate(selection.updatedAt) }}
          </p>
        </div>
        <button
          class="text-neutral-400 hover:text-neutral-900 self-start"
          aria-label="Действия"
        >
          <MoreHorizontal :size="16" />
        </button>
      </div>
    </div>
    <EmptyState
      v-else
      title="Подборок пока нет"
      description="Соберите свою первую подборку в конструкторе"
    />
  </div>
</template>
