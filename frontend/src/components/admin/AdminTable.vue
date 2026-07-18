<script setup lang="ts">
import { Pencil, Trash2 } from "lucide-vue-next";
import type { Material, Category } from "@/types";

interface Props {
  materials: Material[];
  categories: Category[];
}

const props = defineProps<Props>();
const emit = defineEmits<{ edit: [id: string]; remove: [id: string] }>();

function categoryName(categoryId: string) {
  return (
    props.categories.find((category) => category.id === categoryId)?.name ?? "—"
  );
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value);
}
</script>

<template>
  <div class="rounded-xl border border-neutral-200 bg-white overflow-hidden">
    <table class="w-full text-sm">
      <thead
        class="bg-neutral-50 text-neutral-500 text-xs uppercase tracking-wide"
      >
        <tr>
          <th class="text-left px-5 py-3 font-medium">Название</th>
          <th class="text-left px-5 py-3 font-medium">Категория</th>
          <th class="text-left px-5 py-3 font-medium">Цена</th>
          <th class="text-left px-5 py-3 font-medium">Статус</th>
          <th class="text-right px-5 py-3 font-medium">Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="material in materials"
          :key="material.id"
          class="border-t border-neutral-100"
        >
          <td class="px-5 py-3 text-neutral-900">{{ material.title }}</td>
          <td class="px-5 py-3 text-neutral-600">
            {{ categoryName(material.categoryId) }}
          </td>
          <td class="px-5 py-3 text-neutral-900">
            {{ formatPrice(material.price) }} ₽
          </td>
          <td class="px-5 py-3">
            <span
              class="text-xs px-2 py-1 rounded-full"
              :class="
                material.isActive
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-neutral-100 text-neutral-500'
              "
            >
              {{ material.isActive ? "Активен" : "Неактивен" }}
            </span>
          </td>
          <td class="px-5 py-3">
            <div class="flex items-center justify-end gap-3 text-neutral-400">
              <button
                aria-label="Редактировать"
                class="hover:text-neutral-900"
                @click="emit('edit', material.id)"
              >
                <Pencil :size="15" />
              </button>
              <button
                aria-label="Удалить"
                class="hover:text-red-500"
                @click="emit('remove', material.id)"
              >
                <Trash2 :size="15" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
