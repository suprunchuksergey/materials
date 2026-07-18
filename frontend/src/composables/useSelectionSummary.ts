import { computed, type Ref } from "vue";
import type { SelectionItem, Material } from "@/types";

export function useSelectionSummary(
  items: Ref<SelectionItem[]>,
  materials: Ref<Material[]>,
) {
  const enrichedItems = computed(() =>
    items.value.map((item) => ({
      item,
      material:
        materials.value.find((material) => material.id === item.materialId) ??
        null,
    })),
  );

  const totalItemsCount = computed(() => items.value.length);

  const totalCost = computed(() =>
    enrichedItems.value.reduce(
      (sum, { item, material }) => sum + (material?.price ?? 0) * item.quantity,
      0,
    ),
  );

  return { enrichedItems, totalItemsCount, totalCost };
}
