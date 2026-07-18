<script setup lang="ts">
import { Bell, User } from "lucide-vue-next";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>

<template>
  <header
    class="h-16 border-b border-neutral-200 bg-white flex items-center justify-end px-8 gap-4"
  >
    <button
      class="text-neutral-500 hover:text-neutral-900 transition-colors"
      aria-label="Уведомления"
    >
      <Bell :size="18" />
    </button>
    <div class="flex items-center gap-2 text-sm text-neutral-700">
      <div
        class="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center"
      >
        <User :size="16" />
      </div>
      {{ userStore.currentUser?.name ?? "Администратор" }}
    </div>
  </header>
</template>
