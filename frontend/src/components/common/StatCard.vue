<script setup lang="ts">
import { type Component } from "vue";

interface Props {
  icon: Component;
  label: string;
  value: string | number;
}

defineProps<Props>();
</script>

<template>
  <div
    class="rounded-xl border border-neutral-200 bg-white p-5 flex items-center gap-4"
  >
    <div
      class="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-700"
    >
      <component :is="icon" :size="18" />
    </div>
    <div>
      <p class="text-lg font-semibold text-neutral-900">{{ value }}</p>
      <p class="text-xs text-neutral-500">{{ label }}</p>
    </div>
  </div>
</template>
