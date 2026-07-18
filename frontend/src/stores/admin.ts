import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { usersMock } from "@/mocks/users.mock";
import { materialsMock } from "@/mocks/materials.mock";
import { selectionsMock } from "@/mocks/selections.mock";
import { categoriesMock } from "@/mocks/categories.mock";

export const useAdminStore = defineStore("admin", () => {
  const usersCount = ref(usersMock.length);
  const materialsCount = ref(materialsMock.length);
  const selectionsCount = ref(selectionsMock.length);
  const categoriesCount = ref(categoriesMock.length);

  const stats = computed(() => [
    { label: "Пользователи", value: usersCount.value },
    { label: "Материалы", value: materialsCount.value },
    { label: "Подборки", value: selectionsCount.value },
    { label: "Категории", value: categoriesCount.value },
  ]);

  return {
    usersCount,
    materialsCount,
    selectionsCount,
    categoriesCount,
    stats,
  };
});
