<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useMaterialsStore } from "@/stores/materials";
import { useCategoriesStore } from "@/stores/categories";
import { usePagination } from "@/composables/usePagination";
import DataTableToolbar from "@/components/admin/DataTableToolbar.vue";
import DataTablePagination from "@/components/admin/DataTablePagination.vue";
import AdminTable from "@/components/admin/AdminTable.vue";
import ConfirmDialog from "@/components/common/ConfirmDialog.vue";

const router = useRouter();
const materialsStore = useMaterialsStore();
const categoriesStore = useCategoriesStore();

const searchQuery = ref("");
const pendingDeleteId = ref<string | null>(null);

onMounted(() => {
  materialsStore.fetchMaterials();
  categoriesStore.fetchCategories();
});

const filteredMaterials = computed(() =>
  materialsStore.materials.filter((material) =>
    material.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  ),
);

const { currentPage, totalPages, paginatedItems, goToPage } = usePagination(
  filteredMaterials,
  6,
);

function handleEdit(id: string) {
  router.push({ name: "admin-material-edit", params: { id } });
}

function handleConfirmDelete() {
  if (pendingDeleteId.value)
    materialsStore.deleteMaterial(pendingDeleteId.value);
  pendingDeleteId.value = null;
}
</script>

<template>
  <div>
    <DataTableToolbar
      title="Материалы"
      v-model:search-query="searchQuery"
      action-label="Добавить материал"
      @action="router.push({ name: 'admin-material-create' })"
    />
    <AdminTable
      :materials="paginatedItems"
      :categories="categoriesStore.categories"
      @edit="handleEdit"
      @remove="pendingDeleteId = $event"
    />
    <DataTablePagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @update:current-page="goToPage"
    />

    <ConfirmDialog
      :open="!!pendingDeleteId"
      title="Удалить материал?"
      description="Это действие невозможно отменить."
      @confirm="handleConfirmDelete"
      @cancel="pendingDeleteId = null"
    />
  </div>
</template>
