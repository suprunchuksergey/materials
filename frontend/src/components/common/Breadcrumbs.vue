<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ChevronRight } from "lucide-vue-next";

interface Crumb {
  label: string;
  to?: string;
}

interface Props {
  items: Crumb[];
}

defineProps<Props>();
</script>

<template>
  <div class="flex items-center gap-2 text-sm text-neutral-500 mb-6">
    <template v-for="(item, index) in items" :key="item.label">
      <RouterLink v-if="item.to" :to="item.to" class="hover:text-neutral-900">{{
        item.label
      }}</RouterLink>
      <span v-else class="text-neutral-900">{{ item.label }}</span>
      <ChevronRight v-if="index < items.length - 1" :size="14" />
    </template>
  </div>
</template>
