<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useMaterialsStore } from "@/stores/materials";
import { useCategoriesStore } from "@/stores/categories";
import { useSelectionStore } from "@/stores/selection";
import Breadcrumbs from "@/components/common/Breadcrumbs.vue";
import Gallery from "@/components/materials/Gallery.vue";
import ColorPalette from "@/components/materials/ColorPalette.vue";
import FavoriteButton from "@/components/materials/FavoriteButton.vue";
import MaterialGrid from "@/components/materials/MaterialGrid.vue";

const route = useRoute();
const materialsStore = useMaterialsStore();
const categoriesStore = useCategoriesStore();
const selectionStore = useSelectionStore();

const selectedColorId = ref<string | null>(null);

const material = computed(() =>
  materialsStore.getMaterialById(route.params.id as string),
);
const category = computed(() =>
  material.value
    ? categoriesStore.getCategoryById(material.value.categoryId)
    : undefined,
);
const relatedMaterials = computed(() =>
  material.value ? materialsStore.getRelatedMaterials(material.value) : [],
);

watch(
  material,
  (value) => {
    selectedColorId.value = value?.colors[0]?.id ?? null;
  },
  { immediate: true },
);

onMounted(async () => {
  await Promise.all([
    materialsStore.fetchMaterials(),
    categoriesStore.fetchCategories(),
  ]);
});

function formatPrice(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value);
}

function handleAddToSelection() {
  if (!material.value) return;
  selectionStore.addToSelection(
    material.value.id,
    selectedColorId.value,
    material.value.sizes[0]?.id ?? null,
  );
}
</script>

<template>
  <div v-if="material" class="max-w-7xl mx-auto px-8 py-10">
    <Breadcrumbs
      :items="[
        { label: 'Каталог', to: '/catalog' },
        {
          label: category?.name ?? '',
          to: `/catalog?category=${category?.id}`,
        },
        { label: material.title },
      ]"
    />

    <div class="grid grid-cols-2 gap-14">
      <Gallery :images="material.images" />

      <div>
        <p class="text-xs text-neutral-500 mb-1">{{ material.collection }}</p>
        <h1 class="text-2xl font-semibold text-neutral-900">
          {{ material.title }}
        </h1>
        <p class="text-xl font-semibold text-neutral-900 mt-3">
          {{ formatPrice(material.price) }} ₽/{{ material.unit }}
        </p>

        <div class="mt-6">
          <p class="text-sm text-neutral-500 mb-2">Цвет</p>
          <ColorPalette :colors="material.colors" v-model="selectedColorId" />
        </div>

        <p class="text-sm text-neutral-500 leading-relaxed mt-6">
          {{ material.description }}
        </p>

        <div class="mt-6 space-y-2">
          <p class="text-sm font-medium text-neutral-900">Характеристики</p>
          <div
            v-for="characteristic in material.characteristics"
            :key="characteristic.label"
            class="flex justify-between text-sm border-b border-neutral-100 py-2"
          >
            <span class="text-neutral-500">{{ characteristic.label }}</span>
            <span class="text-neutral-900">{{ characteristic.value }}</span>
          </div>
          <div
            class="flex justify-between text-sm border-b border-neutral-100 py-2"
          >
            <span class="text-neutral-500">Производитель</span>
            <span class="text-neutral-900">{{ material.countryOfOrigin }}</span>
          </div>
          <div
            v-for="size in material.sizes"
            :key="size.id"
            class="flex justify-between text-sm border-b border-neutral-100 py-2"
          >
            <span class="text-neutral-500">{{ size.label }}</span>
            <span class="text-neutral-900">{{ size.value }}</span>
          </div>
        </div>

        <div class="flex items-center gap-3 mt-8">
          <button
            class="flex-1 px-5 py-3 rounded-lg bg-neutral-900 text-white text-sm hover:bg-neutral-800"
            @click="handleAddToSelection"
          >
            Добавить в подборку
          </button>
          <FavoriteButton :material-id="material.id" />
        </div>
      </div>
    </div>

    <section v-if="relatedMaterials.length" class="mt-20">
      <h2 class="text-xl font-semibold text-neutral-900 mb-6">
        Похожие материалы
      </h2>
      <MaterialGrid :materials="relatedMaterials" />
    </section>
  </div>
</template>
