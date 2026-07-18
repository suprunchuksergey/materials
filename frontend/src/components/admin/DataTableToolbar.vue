<script setup lang="ts">
import SearchInput from "@/components/common/SearchInput.vue";

interface Props {
  searchQuery: string;
  title: string;
  actionLabel?: string;
}

defineProps<Props>();
const emit = defineEmits<{
  "update:searchQuery": [value: string];
  action: [];
}>();
</script>

<template>
  <div class="flex items-center justify-between mb-6">
    <h1 class="text-2xl font-semibold text-neutral-900">{{ title }}</h1>
    <div class="flex items-center gap-3">
      <SearchInput
        :model-value="searchQuery"
        class="w-64"
        @update:model-value="emit('update:searchQuery', $event)"
      />
      <button
        v-if="actionLabel"
        class="px-4 py-2 rounded-lg bg-neutral-900 text-white text-sm hover:bg-neutral-800 whitespace-nowrap"
        @click="emit('action')"
      >
        {{ actionLabel }}
      </button>
    </div>
  </div>
</template>
