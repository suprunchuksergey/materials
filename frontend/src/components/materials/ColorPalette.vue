<script setup lang="ts">
import type { MaterialColor } from "@/types";

interface Props {
  colors: MaterialColor[];
  modelValue: string | null;
}

defineProps<Props>();
defineEmits<{ "update:modelValue": [value: string] }>();
</script>

<template>
  <div class="flex items-center gap-2">
    <button
      v-for="color in colors"
      :key="color.id"
      class="w-7 h-7 rounded-full border-2 transition-all"
      :class="
        modelValue === color.id ? 'border-neutral-900' : 'border-transparent'
      "
      :style="{ backgroundColor: color.hex }"
      :title="color.name"
      @click="$emit('update:modelValue', color.id)"
    />
  </div>
</template>
