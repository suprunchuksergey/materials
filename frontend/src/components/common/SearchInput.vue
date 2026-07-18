<script setup lang="ts">
import { Search } from "lucide-vue-next";

interface Props {
  modelValue: string;
  placeholder?: string;
}

withDefaults(defineProps<Props>(), { placeholder: "Поиск по каталогу" });
defineEmits<{ "update:modelValue": [value: string] }>();
</script>

<template>
  <div class="relative">
    <Search
      :size="16"
      class="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
    />
    <input
      :value="modelValue"
      type="text"
      :placeholder="placeholder"
      class="w-full pl-9 pr-3 py-2 text-sm bg-white border border-neutral-200 rounded-lg placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
  </div>
</template>
