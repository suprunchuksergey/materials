<script setup lang="ts">
import { RouterLink } from "vue-router";
import type { Category } from "@/types";
import * as icons from "lucide-vue-next";

interface Props {
  category: Category;
}

const props = defineProps<Props>();
</script>

<template>
  <RouterLink
    :to="`/catalog?category=${props.category.id}`"
    class="flex flex-col items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-white py-6 hover:border-neutral-400 transition-colors"
  >
    <component
      :is="(icons as any)[category.iconName]"
      :size="22"
      class="text-neutral-700"
    />
    <span class="text-sm text-neutral-900">{{ category.name }}</span>
  </RouterLink>
</template>
