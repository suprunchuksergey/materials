<script setup lang="ts">
import { RouterLink } from "vue-router";
import type { Material } from "@/types";
import FavoriteButton from "./FavoriteButton.vue";
import PriceBadge from "@/components/common/PriceBadge.vue";

interface Props {
  material: Material;
}

defineProps<Props>();
</script>

<template>
  <RouterLink
    :to="`/catalog/${material.id}`"
    class="group block rounded-xl border border-neutral-200 bg-white overflow-hidden hover:shadow-md transition-shadow"
  >
    <div class="relative aspect-square overflow-hidden bg-neutral-100">
      <img
        :src="material.images[0]?.url"
        :alt="material.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div class="absolute top-2 right-2">
        <FavoriteButton :material-id="material.id" />
      </div>
    </div>
    <div class="p-3">
      <p class="text-sm text-neutral-900 truncate">{{ material.title }}</p>
      <PriceBadge :price="material.price" :unit="material.unit" />
    </div>
  </RouterLink>
</template>
