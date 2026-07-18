<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Pencil, Trash2 } from "lucide-vue-next";
import { useCategoriesStore } from "@/stores/categories";
import DataTableToolbar from "@/components/admin/DataTableToolbar.vue";
import ConfirmDialog from "@/components/common/ConfirmDialog.vue";

const categoriesStore = useCategoriesStore();
const searchQuery = ref("");
const pendingDeleteId = ref<string | null>(null);
const isCreating = ref(false);
const newCategoryName = ref("");

onMounted(() => {
  categoriesStore.fetchCategories();
});

async function handleCreate() {
  if (!newCategoryName.value.trim()) return;
  await categoriesStore.createCategory({
    name: newCategoryName.value,
    slug: "",
    iconName: "Box",
  });
  newCategoryName.value = "";
  isCreating.value = false;
}

function handleConfirmDelete() {
  if (pendingDeleteId.value)
    categoriesStore.deleteCategory(pendingDeleteId.value);
  pendingDeleteId.value = null;
}
</script>

<template>
  <div>
    <DataTableToolbar
      title="Категории"
      v-model:search-query="searchQuery"
      action-label="Добавить категорию"
      @action="isCreating = true"
    />

    <div v-if="isCreating" class="flex items-center gap-3 mb-4">
      <input
        v-model="newCategoryName"
        placeholder="Название категории"
        class="border border-neutral-200 rounded-lg px-3 py-2 text-sm flex-1"
      />
      <button
        class="px-4 py-2 rounded-lg bg-neutral-900 text-white text-sm hover:bg-neutral-800"
        @click="handleCreate"
      >
        Сохранить
      </button>
    </div>

    <div class="rounded-xl border border-neutral-200 bg-white overflow-hidden">
      <table class="w-full text-sm">
        <thead
          class="bg-neutral-50 text-neutral-500 text-xs uppercase tracking-wide"
        >
          <tr>
            <th class="text-left px-5 py-3 font-medium">Название</th>
            <th class="text-right px-5 py-3 font-medium">Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="category in categoriesStore.categories.filter((c) =>
              c.name.toLowerCase().includes(searchQuery.toLowerCase()),
            )"
            :key="category.id"
            class="border-t border-neutral-100"
          >
            <td class="px-5 py-3 text-neutral-900">{{ category.name }}</td>
            <td class="px-5 py-3">
              <div class="flex items-center justify-end gap-3 text-neutral-400">
                <button
                  aria-label="Редактировать"
                  class="hover:text-neutral-900"
                >
                  <Pencil :size="15" />
                </button>
                <button
                  aria-label="Удалить"
                  class="hover:text-red-500"
                  @click="pendingDeleteId = category.id"
                >
                  <Trash2 :size="15" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <ConfirmDialog
      :open="!!pendingDeleteId"
      title="Удалить категорию?"
      description="Материалы этой категории останутся без категории."
      @confirm="handleConfirmDelete"
      @cancel="pendingDeleteId = null"
    />
  </div>
</template>
