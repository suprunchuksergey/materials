<script setup lang="ts">
import { onMounted } from "vue";
import { RouterLink } from "vue-router";
import { Sparkles, Layers, ShieldCheck, Headset } from "lucide-vue-next";
import { useCategoriesStore } from "@/stores/categories";
import CategoryCard from "@/components/materials/CategoryCard.vue";

const categoriesStore = useCategoriesStore();

onMounted(() => {
  categoriesStore.fetchCategories();
});

const benefits = [
  {
    icon: Sparkles,
    title: "Актуальные коллекции и новинки",
    description:
      "Регулярно обновляем каталог материалов от проверенных брендов",
  },
  {
    icon: Layers,
    title: "Удобный подбор и сравнение",
    description: "Сравнивайте материалы по характеристикам в один клик",
  },
  {
    icon: ShieldCheck,
    title: "Сохраняйте и делитесь подборками",
    description: "Формируйте подборку и отправляйте её менеджеру",
  },
  {
    icon: Headset,
    title: "Получите консультацию специалиста",
    description: "Поможем определиться с выбором на любом этапе ремонта",
  },
];

const steps = [
  {
    title: "Выберите материалы",
    description:
      "Просмотрите каталог и добавьте понравившиеся позиции в подборку",
  },
  {
    title: "Сформируйте подборку",
    description:
      "Укажите количество и добавьте комментарии к каждому материалу",
  },
  {
    title: "Отправьте заявку",
    description: "Мы получим вашу подборку и свяжемся для уточнения деталей",
  },
];
</script>

<template>
  <section class="max-w-7xl mx-auto px-8 pt-16 pb-14">
    <div class="max-w-xl">
      <h1 class="text-4xl font-semibold text-neutral-900 leading-tight">
        Материалы для вашего идеального интерьера
      </h1>
      <p class="text-neutral-500 mt-4 leading-relaxed">
        Выбирайте лучшие материалы для ремонта и создавайте интерьер своей мечты
      </p>
      <div class="flex items-center gap-3 mt-7">
        <RouterLink
          to="/catalog"
          class="px-5 py-2.5 rounded-lg bg-neutral-900 text-white text-sm hover:bg-neutral-800"
        >
          Перейти в каталог
        </RouterLink>
        <RouterLink
          to="/constructor"
          class="px-5 py-2.5 rounded-lg border border-neutral-200 text-neutral-900 text-sm hover:bg-neutral-100"
        >
          Собрать подборку
        </RouterLink>
      </div>
    </div>
  </section>

  <section class="max-w-7xl mx-auto px-8 pb-16">
    <div class="grid grid-cols-8 gap-4">
      <CategoryCard
        v-for="category in categoriesStore.categories"
        :key="category.id"
        :category="category"
      />
    </div>
  </section>

  <section class="max-w-7xl mx-auto px-8 pb-20">
    <div class="grid grid-cols-4 gap-8">
      <div
        v-for="benefit in benefits"
        :key="benefit.title"
        class="flex flex-col items-center text-center gap-3"
      >
        <div
          class="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-700"
        >
          <component :is="benefit.icon" :size="18" />
        </div>
        <p class="text-sm font-medium text-neutral-900">{{ benefit.title }}</p>
        <p class="text-xs text-neutral-500">{{ benefit.description }}</p>
      </div>
    </div>
  </section>

  <section class="bg-white border-y border-neutral-200">
    <div class="max-w-7xl mx-auto px-8 py-16">
      <h2 class="text-2xl font-semibold text-neutral-900 mb-10">
        Как это работает
      </h2>
      <div class="grid grid-cols-3 gap-8">
        <div v-for="(step, index) in steps" :key="step.title">
          <span class="text-xs text-neutral-400">{{
            String(index + 1).padStart(2, "0")
          }}</span>
          <p class="text-sm font-medium text-neutral-900 mt-2">
            {{ step.title }}
          </p>
          <p class="text-xs text-neutral-500 mt-1">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="max-w-7xl mx-auto px-8 py-20 text-center">
    <h2 class="text-2xl font-semibold text-neutral-900">
      Готовы начать подбор материалов?
    </h2>
    <p class="text-sm text-neutral-500 mt-2">
      Перейдите в каталог и соберите собственную подборку для ремонта
    </p>
    <RouterLink
      to="/catalog"
      class="inline-block mt-6 px-6 py-3 rounded-lg bg-neutral-900 text-white text-sm hover:bg-neutral-800"
    >
      Перейти в каталог
    </RouterLink>
  </section>
</template>
