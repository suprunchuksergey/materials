<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useFavoritesStore } from "@/stores/favorites";
import { useMaterialsStore } from "@/stores/materials";
import PageHeader from "@/components/common/PageHeader.vue";
import MaterialGrid from "@/components/materials/MaterialGrid.vue";

const favoritesStore = useFavoritesStore();
const materialsStore = useMaterialsStore();

onMounted(() => {
  materialsStore.fetchMaterials();
});

const favoriteMaterials = computed(() =>
  materialsStore.materials.filter((material) =>
    favoritesStore.favoriteMaterialIds.includes(material.id),
  ),
);
</script>

<template>
  <div>
    <PageHeader title="Избранное" />
    <MaterialGrid :materials="favoriteMaterials" />
  </div>
</template>
