<script setup lang="ts">
interface Props {
  count?: number;
}

withDefaults(defineProps<Props>(), { count: 8 });
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <div
      v-for="n in count"
      :key="n"
      class="rounded-xl border border-neutral-200 bg-white overflow-hidden animate-pulse"
    >
      <div class="aspect-square bg-neutral-100" />
      <div class="p-3 space-y-2">
        <div class="h-3 bg-neutral-100 rounded w-3/4" />
        <div class="h-3 bg-neutral-100 rounded w-1/2" />
      </div>
    </div>
  </div>
</template>
