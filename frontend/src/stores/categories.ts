import { defineStore } from "pinia";
import { ref } from "vue";
import type { Category } from "@/types";
import { categoriesMock } from "@/mocks/categories.mock";

export const useCategoriesStore = defineStore("categories", () => {
  const categories = ref<Category[]>([]);
  const isLoading = ref(false);

  async function fetchCategories() {
    isLoading.value = true;
    // Заменить на: const { data } = await api.get('/categories')
    categories.value = categoriesMock;
    isLoading.value = false;
  }

  async function createCategory(
    payload: Omit<Category, "id" | "materialsCount">,
  ) {
    const newCategory: Category = {
      ...payload,
      id: `cat-${Date.now()}`,
      materialsCount: 0,
    };
    categories.value.push(newCategory);
    return newCategory;
  }

  async function updateCategory(id: string, payload: Partial<Category>) {
    const index = categories.value.findIndex((category) => category.id === id);
    if (index !== -1)
      categories.value[index] = { ...categories.value[index], ...payload };
  }

  async function deleteCategory(id: string) {
    categories.value = categories.value.filter(
      (category) => category.id !== id,
    );
  }

  function getCategoryById(id: string) {
    return categories.value.find((category) => category.id === id);
  }

  return {
    categories,
    isLoading,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
  };
});
