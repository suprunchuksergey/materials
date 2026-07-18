<script setup lang="ts">
import { type Component } from "vue";

interface Props {
  icon: Component;
  title: string;
  description: string;
}

defineProps<Props>();
</script>

<template>
  <div class="flex flex-col items-center text-center gap-3">
    <div
      class="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-700"
    >
      <component :is="icon" :size="18" />
    </div>
    <p class="text-sm font-medium text-neutral-900">{{ title }}</p>
    <p class="text-xs text-neutral-500">{{ description }}</p>
  </div>
</template>
