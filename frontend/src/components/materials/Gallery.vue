<script setup lang="ts">
import { ref } from "vue";
import type { MaterialImage } from "@/types";

interface Props {
  images: MaterialImage[];
}

const props = defineProps<Props>();
const activeIndex = ref(0);
</script>

<template>
  <div>
    <div
      class="aspect-square rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200"
    >
      <img
        :src="props.images[activeIndex]?.url"
        :alt="props.images[activeIndex]?.alt"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="flex gap-3 mt-3">
      <button
        v-for="(image, index) in images"
        :key="image.id"
        class="w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors"
        :class="
          index === activeIndex ? 'border-neutral-900' : 'border-transparent'
        "
        @click="activeIndex = index"
      >
        <img
          :src="image.url"
          :alt="image.alt"
          class="w-full h-full object-cover"
        />
      </button>
    </div>
  </div>
</template>
