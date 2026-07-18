<script setup lang="ts">
import { ImagePlus, X } from "lucide-vue-next";
import type { MaterialImage } from "@/types";

interface Props {
  images: MaterialImage[];
}

defineProps<Props>();
const emit = defineEmits<{ add: []; remove: [id: string] }>();
</script>

<template>
  <div class="grid grid-cols-5 gap-3">
    <div
      v-for="image in images"
      :key="image.id"
      class="relative aspect-square rounded-lg overflow-hidden border border-neutral-200"
    >
      <img
        :src="image.url"
        :alt="image.alt"
        class="w-full h-full object-cover"
      />
      <button
        class="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/90 flex items-center justify-center text-neutral-700 hover:text-red-500"
        aria-label="Удалить изображение"
        @click="emit('remove', image.id)"
      >
        <X :size="12" />
      </button>
    </div>
    <button
      class="aspect-square rounded-lg border border-dashed border-neutral-300 flex flex-col items-center justify-center gap-1 text-neutral-400 hover:border-neutral-400 hover:text-neutral-600"
      @click="emit('add')"
    >
      <ImagePlus :size="18" />
      <span class="text-xs">Добавить</span>
    </button>
  </div>
</template>
