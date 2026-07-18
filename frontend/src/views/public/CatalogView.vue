<script setup lang="ts">
import { onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useMaterialsStore } from "@/stores/materials";
import { useCategoriesStore } from "@/stores/categories";
import { manufacturersMock } from "@/mocks/manufacturers.mock";
import { useFilters } from "@/composables/useFilters";
import { usePagination } from "@/composables/usePagination";
import SearchInput from "@/components/common/SearchInput.vue";
import MaterialFilters from "@/components/materials/MaterialFilters.vue";
import MaterialGrid from "@/components/materials/MaterialGrid.vue";
import Pagination from "@/components/common/Pagination.vue";
import LoadingSkeleton from "@/components/common/LoadingSkeleton.vue";

const route = useRoute();
const materialsStore = useMaterialsStore();
const categoriesStore = useCategoriesStore();

const materials = computed(() => materialsStore.materials);
const {
  searchQuery,
  selectedCategoryId,
  selectedManufacturerIds,
  sortOption,
  filteredMaterials,
} = useFilters(materials);

const { currentPage, totalPages, paginatedItems, goToPage } = usePagination(
  filteredMaterials,
  8,
);

watch(filteredMaterials, () => goToPage(1));

onMounted(async () => {
  await Promise.all([
    materialsStore.fetchMaterials(),
    categoriesStore.fetchCategories(),
  ]);
  const categoryFromQuery = route.query.category;
  if (typeof categoryFromQuery === "string")
    selectedCategoryId.value = categoryFromQuery;
});
</script>

<template>
  <div class="max-w-7xl mx-auto px-8 py-10">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-semibold text-neutral-900">
        Каталог материалов
      </h1>
      <SearchInput v-model="searchQuery" class="w-72" />
    </div>

    <div class="flex gap-8">
      <MaterialFilters
        :categories="categoriesStore.categories"
        :manufacturers="manufacturersMock"
        v-model:selected-category-id="selectedCategoryId"
        v-model:selected-manufacturer-ids="selectedManufacturerIds"
        v-model:sort-option="sortOption"
      />

      <div class="flex-1">
        <LoadingSkeleton v-if="materialsStore.isLoading" />
        <template v-else>
          <MaterialGrid :materials="paginatedItems" />
          <div v-if="totalPages > 1" class="mt-10">
            <Pagination
              :current-page="currentPage"
              :total-pages="totalPages"
              @update:current-page="goToPage"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
