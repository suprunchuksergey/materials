<script setup lang="ts">
import { PackageOpen } from "lucide-vue-next";

interface Props {
  title: string;
  description?: string;
}

defineProps<Props>();
</script>

<template>
  <div
    class="flex flex-col items-center justify-center text-center py-20 text-neutral-500"
  >
    <PackageOpen :size="32" class="mb-4 text-neutral-300" />
    <p class="text-neutral-900 font-medium">{{ title }}</p>
    <p v-if="description" class="text-sm mt-1 max-w-sm">{{ description }}</p>
  </div>
</template>
