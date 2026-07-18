<script setup lang="ts">
import { Check } from "lucide-vue-next";

const advantages = [
  "Широкий ассортимент материалов",
  "Только проверенные бренды",
  "Доступные цены",
  "Профессиональная консультация",
  "Быстрая доставка",
];

const stats = [
  { value: "5000+", label: "довольных клиентов" },
  { value: "10000+", label: "материалов в каталоге" },
  { value: "50+", label: "брендов-партнёров" },
  { value: "5 лет", label: "на рынке" },
];
</script>

<template>
  <div class="max-w-7xl mx-auto px-8 py-14">
    <div class="grid grid-cols-2 gap-14 items-center">
      <div>
        <h1 class="text-2xl font-semibold text-neutral-900">
          О компании BuildChoice
        </h1>
        <p class="text-sm text-neutral-500 mt-4 leading-relaxed">
          Мы помогаем создавать красивые и функциональные интерьеры, предлагая
          качественные материалы от проверенных производителей.
        </p>
        <ul class="mt-6 space-y-3">
          <li
            v-for="advantage in advantages"
            :key="advantage"
            class="flex items-center gap-2 text-sm text-neutral-700"
          >
            <Check :size="16" class="text-neutral-900" />
            {{ advantage }}
          </li>
        </ul>
      </div>
      <img
        src="https://picsum.photos/seed/buildchoice-about/900/700"
        alt="Интерьер BuildChoice"
        class="w-full rounded-xl object-cover"
      />
    </div>

    <div class="grid grid-cols-4 gap-8 mt-16 border-t border-neutral-200 pt-10">
      <div v-for="stat in stats" :key="stat.label">
        <p class="text-2xl font-semibold text-neutral-900">{{ stat.value }}</p>
        <p class="text-xs text-neutral-500 mt-1">{{ stat.label }}</p>
      </div>
    </div>
  </div>
</template>
