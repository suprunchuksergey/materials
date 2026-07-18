import { defineStore } from "pinia";
import { ref } from "vue";
import type { Material } from "@/types";
import { materialsMock } from "@/mocks/materials.mock";

export const useMaterialsStore = defineStore("materials", () => {
  const materials = ref<Material[]>([]);
  const isLoading = ref(false);

  async function fetchMaterials() {
    isLoading.value = true;
    // Заменить на: const { data } = await api.get('/materials')
    materials.value = materialsMock;
    isLoading.value = false;
  }

  function getMaterialById(id: string) {
    return materials.value.find((material) => material.id === id);
  }

  function getRelatedMaterials(material: Material, limit = 4) {
    return materials.value
      .filter(
        (item) =>
          item.categoryId === material.categoryId && item.id !== material.id,
      )
      .slice(0, limit);
  }

  async function createMaterial(payload: Omit<Material, "id" | "createdAt">) {
    const newMaterial: Material = {
      ...payload,
      id: `mat-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    materials.value.unshift(newMaterial);
    return newMaterial;
  }

  async function updateMaterial(id: string, payload: Partial<Material>) {
    const index = materials.value.findIndex((material) => material.id === id);
    if (index !== -1)
      materials.value[index] = { ...materials.value[index], ...payload };
  }

  async function deleteMaterial(id: string) {
    materials.value = materials.value.filter((material) => material.id !== id);
  }

  return {
    materials,
    isLoading,
    fetchMaterials,
    getMaterialById,
    getRelatedMaterials,
    createMaterial,
    updateMaterial,
    deleteMaterial,
  };
});
