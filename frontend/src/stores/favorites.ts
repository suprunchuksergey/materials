import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Favorite } from "@/types";

export const useFavoritesStore = defineStore("favorites", () => {
  const favorites = ref<Favorite[]>([]);
  const currentUserId = ref("user-1");

  const favoriteMaterialIds = computed(() =>
    favorites.value.map((favorite) => favorite.materialId),
  );

  function isFavorite(materialId: string) {
    return favoriteMaterialIds.value.includes(materialId);
  }

  function toggleFavorite(materialId: string) {
    if (isFavorite(materialId)) {
      favorites.value = favorites.value.filter(
        (favorite) => favorite.materialId !== materialId,
      );
      return;
    }
    favorites.value.push({
      id: `fav-${Date.now()}`,
      materialId,
      userId: currentUserId.value,
      createdAt: new Date().toISOString(),
    });
  }

  return { favorites, favoriteMaterialIds, isFavorite, toggleFavorite };
});
