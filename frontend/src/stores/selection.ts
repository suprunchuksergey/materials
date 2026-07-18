import { defineStore } from "pinia";
import { ref } from "vue";
import type { Selection, SelectionItem } from "@/types";
import { selectionsMock } from "@/mocks/selections.mock";

export const useSelectionStore = defineStore("selection", () => {
  const selections = ref<Selection[]>([]);
  const currentItems = ref<SelectionItem[]>([]);
  const isLoading = ref(false);

  async function fetchSelections() {
    isLoading.value = true;
    // Заменить на: const { data } = await api.get('/selections')
    selections.value = selectionsMock;
    isLoading.value = false;
  }

  function addToSelection(
    materialId: string,
    colorId: string | null = null,
    sizeId: string | null = null,
  ) {
    const existing = currentItems.value.find(
      (item) => item.materialId === materialId,
    );
    if (existing) {
      existing.quantity += 1;
      return;
    }
    currentItems.value.push({
      id: `item-${Date.now()}`,
      materialId,
      colorId,
      sizeId,
      quantity: 1,
      comment: "",
    });
  }

  function removeFromSelection(itemId: string) {
    currentItems.value = currentItems.value.filter(
      (item) => item.id !== itemId,
    );
  }

  function updateItemQuantity(itemId: string, quantity: number) {
    const item = currentItems.value.find((entry) => entry.id === itemId);
    if (item) item.quantity = Math.max(1, quantity);
  }

  function updateItemComment(itemId: string, comment: string) {
    const item = currentItems.value.find((entry) => entry.id === itemId);
    if (item) item.comment = comment;
  }

  async function submitSelection(title: string, recipientEmail: string) {
    const newSelection: Selection = {
      id: `sel-${Date.now()}`,
      userId: "user-1",
      title,
      recipientEmail,
      items: currentItems.value,
      status: "sent",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    // Заменить на: await api.post('/selections', newSelection)
    selections.value.unshift(newSelection);
    currentItems.value = [];
    return newSelection;
  }

  return {
    selections,
    currentItems,
    isLoading,
    fetchSelections,
    addToSelection,
    removeFromSelection,
    updateItemQuantity,
    updateItemComment,
    submitSelection,
  };
});
