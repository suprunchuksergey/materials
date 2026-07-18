import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "@/types";
import { usersMock } from "@/mocks/users.mock";

export const useUserStore = defineStore("user", () => {
  const currentUser = ref<User | null>(null);
  const isLoading = ref(false);

  async function fetchCurrentUser() {
    isLoading.value = true;
    // Заменить на: const { data } = await api.get('/me')
    currentUser.value = usersMock[0];
    isLoading.value = false;
  }

  async function updateProfile(payload: Partial<User>) {
    if (!currentUser.value) return;
    currentUser.value = { ...currentUser.value, ...payload };
  }

  return { currentUser, isLoading, fetchCurrentUser, updateProfile };
});
