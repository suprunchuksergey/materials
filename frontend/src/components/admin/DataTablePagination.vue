<script setup lang="ts">
import Pagination from "@/components/common/Pagination.vue";

interface Props {
  currentPage: number;
  totalPages: number;
}

defineProps<Props>();
const emit = defineEmits<{ "update:currentPage": [value: number] }>();
</script>

<template>
  <div class="mt-6">
    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @update:current-page="emit('update:currentPage', $event)"
    />
  </div>
</template>
