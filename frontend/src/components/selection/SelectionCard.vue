<script setup lang="ts">
import { Trash2 } from "lucide-vue-next";
import type { Material, SelectionItem } from "@/types";
import FavoriteButton from "@/components/materials/FavoriteButton.vue";

interface Props {
  item: SelectionItem;
  material: Material;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  remove: [itemId: string];
  "update:quantity": [itemId: string, quantity: number];
  "update:comment": [itemId: string, comment: string];
}>();

function formatPrice(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value);
}
</script>

<template>
  <div
    class="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-3"
  >
    <img
      :src="material.images[0]?.url"
      :alt="material.title"
      class="w-16 h-16 rounded-lg object-cover"
    />
    <div class="flex-1 min-w-0">
      <p class="text-sm text-neutral-900 truncate">{{ material.title }}</p>
      <p class="text-sm text-neutral-500">
        {{ formatPrice(material.price) }} ₽/{{ material.unit }}
      </p>
    </div>
    <input
      type="number"
      min="1"
      class="w-16 border border-neutral-200 rounded-lg text-sm px-2 py-1 text-center"
      :value="item.quantity"
      @input="
        emit(
          'update:quantity',
          item.id,
          Number(($event.target as HTMLInputElement).value),
        )
      "
    />
    <FavoriteButton :material-id="material.id" />
    <button
      class="text-neutral-400 hover:text-red-500 transition-colors"
      aria-label="Удалить"
      @click="emit('remove', item.id)"
    >
      <Trash2 :size="16" />
    </button>
  </div>
</template>
