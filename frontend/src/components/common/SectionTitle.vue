<script setup lang="ts">
interface Props {
  title: string;
  description?: string;
}

defineProps<Props>();
</script>

<template>
  <div class="mb-10">
    <h2 class="text-2xl font-semibold text-neutral-900">{{ title }}</h2>
    <p v-if="description" class="text-sm text-neutral-500 mt-2 max-w-xl">
      {{ description }}
    </p>
  </div>
</template>
