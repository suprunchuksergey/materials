<script setup lang="ts">
interface Props {
  title: string;
  subtitle?: string;
}

defineProps<Props>();
</script>

<template>
  <div class="mb-8">
    <h1 class="text-2xl font-semibold text-neutral-900">{{ title }}</h1>
    <p v-if="subtitle" class="text-sm text-neutral-500 mt-2">{{ subtitle }}</p>
  </div>
</template>
