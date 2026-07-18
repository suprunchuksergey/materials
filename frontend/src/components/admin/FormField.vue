<script setup lang="ts">
interface Props {
  label: string;
  modelValue: string | number;
  type?: "text" | "number" | "textarea";
  placeholder?: string;
}

withDefaults(defineProps<Props>(), { type: "text" });
defineEmits<{ "update:modelValue": [value: string] }>();
</script>

<template>
  <label class="block">
    <span class="text-sm text-neutral-700 mb-1.5 block">{{ label }}</span>
    <textarea
      v-if="type === 'textarea'"
      :value="modelValue"
      :placeholder="placeholder"
      rows="4"
      class="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-900"
      @input="
        $emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)
      "
    />
    <input
      v-else
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      class="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-900"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
  </label>
</template>
