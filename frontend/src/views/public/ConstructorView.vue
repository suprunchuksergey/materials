<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useSelectionStore } from "@/stores/selection";
import { useMaterialsStore } from "@/stores/materials";
import { useSelectionSummary } from "@/composables/useSelectionSummary";
import SelectionCard from "@/components/selection/SelectionCard.vue";
import EmptyState from "@/components/common/EmptyState.vue";

const selectionStore = useSelectionStore();
const materialsStore = useMaterialsStore();

onMounted(() => {
  materialsStore.fetchMaterials();
});

const materials = computed(() => materialsStore.materials);
const items = computed(() => selectionStore.currentItems);
const { enrichedItems, totalItemsCount, totalCost } = useSelectionSummary(
  items,
  materials,
);

const title = ref("Моя подборка");
const recipientEmail = ref("info@remont.ru");
const isSubmitted = ref(false);

function formatPrice(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value);
}

async function handleSubmit() {
  await selectionStore.submitSelection(title.value, recipientEmail.value);
  isSubmitted.value = true;
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-8 py-10">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-semibold text-neutral-900">{{ title }}</h1>
        <p class="text-sm text-neutral-500 mt-1">
          {{ totalItemsCount }} материалов
        </p>
      </div>
      <button
        class="px-5 py-2.5 rounded-lg bg-neutral-900 text-white text-sm hover:bg-neutral-800 disabled:opacity-40"
        :disabled="!items.length"
        @click="handleSubmit"
      >
        Отправить подборку
      </button>
    </div>

    <p v-if="isSubmitted" class="mb-6 text-sm text-emerald-600">
      Подборка успешно отправлена компании.
    </p>

    <div class="grid grid-cols-[1fr_320px] gap-8">
      <div class="space-y-3">
        <template v-if="enrichedItems.length">
          <SelectionCard
            v-for="entry in enrichedItems"
            :key="entry.item.id"
            v-show="entry.material"
            :item="entry.item"
            :material="entry.material!"
            @remove="selectionStore.removeFromSelection"
            @update:quantity="selectionStore.updateItemQuantity"
            @update:comment="selectionStore.updateItemComment"
          />
        </template>
        <EmptyState
          v-else
          title="Подборка пуста"
          description="Добавьте материалы из каталога, чтобы собрать свою подборку"
        />
      </div>

      <aside
        class="rounded-xl border border-neutral-200 bg-white p-5 h-fit space-y-4"
      >
        <div>
          <span class="text-sm text-neutral-700 mb-1.5 block"
            >Название подборки</span
          >
          <input
            v-model="title"
            class="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <div>
          <span class="text-sm text-neutral-700 mb-1.5 block"
            >Email получателя</span
          >
          <input
            v-model="recipientEmail"
            class="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <div
          class="flex justify-between text-sm border-t border-neutral-100 pt-4"
        >
          <span class="text-neutral-500">Материалов</span>
          <span class="text-neutral-900">{{ totalItemsCount }}</span>
        </div>
        <div class="flex justify-between text-sm font-medium">
          <span class="text-neutral-500">Общая стоимость</span>
          <span class="text-neutral-900">{{ formatPrice(totalCost) }} ₽</span>
        </div>
      </aside>
    </div>
  </div>
</template>
