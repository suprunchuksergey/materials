<script setup lang="ts">
interface Props {
  open: boolean;
  title: string;
  description?: string;
}

defineProps<Props>();
const emit = defineEmits<{ confirm: []; cancel: [] }>();
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
  >
    <div
      class="bg-white rounded-xl border border-neutral-200 shadow-lg w-full max-w-sm p-6"
    >
      <h3 class="text-base font-semibold text-neutral-900">{{ title }}</h3>
      <p v-if="description" class="text-sm text-neutral-500 mt-2">
        {{ description }}
      </p>
      <div class="flex justify-end gap-3 mt-6">
        <button
          class="px-4 py-2 text-sm rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
          @click="emit('cancel')"
        >
          Отмена
        </button>
        <button
          class="px-4 py-2 text-sm rounded-lg bg-neutral-900 text-white hover:bg-neutral-800"
          @click="emit('confirm')"
        >
          Подтвердить
        </button>
      </div>
    </div>
  </div>
</template>
