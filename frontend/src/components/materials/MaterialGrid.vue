<script setup lang="ts">
import type { Material } from "@/types";
import MaterialCard from "./MaterialCard.vue";
import EmptyState from "@/components/common/EmptyState.vue";

interface Props {
  materials: Material[];
}

defineProps<Props>();
</script>

<template>
  <div v-if="materials.length" class="grid grid-cols-4 gap-5">
    <MaterialCard
      v-for="material in materials"
      :key="material.id"
      :material="material"
    />
  </div>
  <EmptyState
    v-else
    title="Материалы не найдены"
    description="Попробуйте изменить параметры поиска или фильтры"
  />
</template>
