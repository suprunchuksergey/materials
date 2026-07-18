<script setup lang="ts">
import type { Category, Manufacturer } from "@/types";
import type { SortOption } from "@/composables/useFilters";

interface Props {
  categories: Category[];
  manufacturers: Manufacturer[];
  selectedCategoryId: string | null;
  selectedManufacturerIds: string[];
  sortOption: SortOption;
}

defineProps<Props>();
const emit = defineEmits<{
  "update:selectedCategoryId": [value: string | null];
  "update:selectedManufacturerIds": [value: string[]];
  "update:sortOption": [value: SortOption];
}>();

const sortLabels: Record<SortOption, string> = {
  popular: "Популярные",
  "price-asc": "Цена: по возрастанию",
  "price-desc": "Цена: по убыванию",
  new: "Сначала новые",
};

function toggleManufacturer(id: string, current: string[]) {
  const next = current.includes(id)
    ? current.filter((item) => item !== id)
    : [...current, id];
  emit("update:selectedManufacturerIds", next);
}
</script>

<template>
  <aside class="w-56 shrink-0 space-y-6">
    <div>
      <button
        class="w-full text-left px-3 py-2 rounded-lg text-sm mb-1 transition-colors"
        :class="
          !selectedCategoryId
            ? 'bg-neutral-900 text-white'
            : 'text-neutral-700 hover:bg-neutral-100'
        "
        @click="emit('update:selectedCategoryId', null)"
      >
        Все материалы
      </button>
      <button
        v-for="category in categories"
        :key="category.id"
        class="w-full text-left px-3 py-2 rounded-lg text-sm mb-1 transition-colors"
        :class="
          selectedCategoryId === category.id
            ? 'bg-neutral-900 text-white'
            : 'text-neutral-700 hover:bg-neutral-100'
        "
        @click="emit('update:selectedCategoryId', category.id)"
      >
        {{ category.name }}
      </button>
    </div>

    <div>
      <p
        class="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2"
      >
        Производитель
      </p>
      <label
        v-for="manufacturer in manufacturers"
        :key="manufacturer.id"
        class="flex items-center gap-2 text-sm text-neutral-700 py-1 cursor-pointer"
      >
        <input
          type="checkbox"
          class="rounded border-neutral-300"
          :checked="selectedManufacturerIds.includes(manufacturer.id)"
          @change="toggleManufacturer(manufacturer.id, selectedManufacturerIds)"
        />
        {{ manufacturer.name }}
      </label>
    </div>

    <div>
      <p
        class="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2"
      >
        Сортировка
      </p>
      <select
        class="w-full border border-neutral-200 rounded-lg text-sm px-3 py-2 bg-white"
        :value="sortOption"
        @change="
          emit(
            'update:sortOption',
            ($event.target as HTMLSelectElement).value as SortOption,
          )
        "
      >
        <option
          v-for="(label, value) in sortLabels"
          :key="value"
          :value="value"
        >
          {{ label }}
        </option>
      </select>
    </div>
  </aside>
</template>
