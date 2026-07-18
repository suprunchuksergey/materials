<script setup lang="ts">
import { onMounted } from "vue";
import { useSelectionStore } from "@/stores/selection";
import PageHeader from "@/components/common/PageHeader.vue";

const selectionStore = useSelectionStore();

onMounted(() => {
  selectionStore.fetchSelections();
});

const statusStyles: Record<string, string> = {
  draft: "bg-neutral-100 text-neutral-500",
  sent: "bg-blue-50 text-blue-600",
  viewed: "bg-amber-50 text-amber-600",
  delivered: "bg-emerald-50 text-emerald-600",
};

const statusLabels: Record<string, string> = {
  draft: "Черновик",
  sent: "Отправлено",
  viewed: "Просмотрено",
  delivered: "Доставлено",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ru-RU").format(new Date(value));
}
</script>

<template>
  <div>
    <PageHeader title="Отправленные подборки" />

    <div class="rounded-xl border border-neutral-200 bg-white overflow-hidden">
      <table class="w-full text-sm">
        <thead
          class="bg-neutral-50 text-neutral-500 text-xs uppercase tracking-wide"
        >
          <tr>
            <th class="text-left px-5 py-3 font-medium">Название</th>
            <th class="text-left px-5 py-3 font-medium">Получатель</th>
            <th class="text-left px-5 py-3 font-medium">Дата отправки</th>
            <th class="text-left px-5 py-3 font-medium">Статус</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="selection in selectionStore.selections"
            :key="selection.id"
            class="border-t border-neutral-100"
          >
            <td class="px-5 py-3 text-neutral-900">{{ selection.title }}</td>
            <td class="px-5 py-3 text-neutral-600">
              {{ selection.recipientEmail }}
            </td>
            <td class="px-5 py-3 text-neutral-600">
              {{ formatDate(selection.createdAt) }}
            </td>
            <td class="px-5 py-3">
              <span
                class="text-xs px-2 py-1 rounded-full"
                :class="statusStyles[selection.status]"
              >
                {{ statusLabels[selection.status] }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
