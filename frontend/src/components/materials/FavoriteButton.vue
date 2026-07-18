<script setup lang="ts">
import { Heart } from "lucide-vue-next";
import { useFavoritesStore } from "@/stores/favorites";

interface Props {
  materialId: string;
}

const props = defineProps<Props>();
const favoritesStore = useFavoritesStore();
</script>

<template>
  <button
    class="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center border border-neutral-200 hover:bg-white transition-colors"
    :aria-label="
      favoritesStore.isFavorite(props.materialId)
        ? 'Убрать из избранного'
        : 'В избранное'
    "
    @click.stop.prevent="favoritesStore.toggleFavorite(props.materialId)"
  >
    <Heart
      :size="15"
      :fill="favoritesStore.isFavorite(props.materialId) ? '#1a1a1a' : 'none'"
      class="text-neutral-900"
    />
  </button>
</template>
