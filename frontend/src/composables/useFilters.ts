import { ref, computed, type Ref } from "vue";
import type { Material } from "@/types";

export type SortOption = "popular" | "price-asc" | "price-desc" | "new";

export function useFilters(materials: Ref<Material[]>) {
  const searchQuery = ref("");
  const selectedCategoryId = ref<string | null>(null);
  const selectedManufacturerIds = ref<string[]>([]);
  const priceRange = ref<[number, number]>([0, 30000]);
  const sortOption = ref<SortOption>("popular");

  const filteredMaterials = computed(() => {
    let result = materials.value.filter((material) => {
      const matchesQuery = material.title
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());
      const matchesCategory =
        !selectedCategoryId.value ||
        material.categoryId === selectedCategoryId.value;
      const matchesManufacturer =
        selectedManufacturerIds.value.length === 0 ||
        selectedManufacturerIds.value.includes(material.manufacturerId);
      const matchesPrice =
        material.price >= priceRange.value[0] &&
        material.price <= priceRange.value[1];
      return (
        matchesQuery && matchesCategory && matchesManufacturer && matchesPrice
      );
    });

    result = [...result].sort((a, b) => {
      switch (sortOption.value) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "new":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        default:
          return Number(b.isPopular) - Number(a.isPopular);
      }
    });

    return result;
  });

  function resetFilters() {
    searchQuery.value = "";
    selectedCategoryId.value = null;
    selectedManufacturerIds.value = [];
    priceRange.value = [0, 30000];
    sortOption.value = "popular";
  }

  return {
    searchQuery,
    selectedCategoryId,
    selectedManufacturerIds,
    priceRange,
    sortOption,
    filteredMaterials,
    resetFilters,
  };
}
