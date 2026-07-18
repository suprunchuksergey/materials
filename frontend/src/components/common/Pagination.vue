<script setup lang="ts">
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { computed } from "vue";

interface Props {
  currentPage: number;
  totalPages: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{ "update:currentPage": [value: number] }>();

const pages = computed(() =>
  Array.from({ length: props.totalPages }, (_, i) => i + 1),
);
</script>

<template>
  <div class="flex items-center justify-center gap-1">
    <button
      class="w-8 h-8 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-100 disabled:opacity-40"
      :disabled="currentPage === 1"
      @click="emit('update:currentPage', currentPage - 1)"
    >
      <ChevronLeft :size="16" />
    </button>
    <button
      v-for="page in pages"
      :key="page"
      class="w-8 h-8 flex items-center justify-center rounded-lg text-sm"
      :class="
        page === currentPage
          ? 'bg-neutral-900 text-white'
          : 'text-neutral-600 hover:bg-neutral-100'
      "
      @click="emit('update:currentPage', page)"
    >
      {{ page }}
    </button>
    <button
      class="w-8 h-8 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-100 disabled:opacity-40"
      :disabled="currentPage === totalPages"
      @click="emit('update:currentPage', currentPage + 1)"
    >
      <ChevronRight :size="16" />
    </button>
  </div>
</template>
