<script setup lang="ts">
interface Props {
  price: number;
  unit: string;
}

defineProps<Props>();

function formatPrice(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value);
}
</script>

<template>
  <span class="text-sm font-semibold text-neutral-900"
    >{{ formatPrice(price) }} ₽/{{ unit }}</span
  >
</template>
