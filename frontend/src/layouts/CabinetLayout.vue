<script setup lang="ts">
import AppHeader from "@/components/common/AppHeader.vue";
import AppFooter from "@/components/common/AppFooter.vue";
import CabinetSidebar from "@/components/cabinet/CabinetSidebar.vue";
</script>

<template>
  <div class="min-h-screen bg-neutral-50 flex flex-col">
    <AppHeader />
    <main class="flex-1">
      <div
        class="max-w-7xl mx-auto px-8 py-10 grid grid-cols-[240px_1fr] gap-8"
      >
        <CabinetSidebar />
        <router-view />
      </div>
    </main>
    <AppFooter />
  </div>
</template>
