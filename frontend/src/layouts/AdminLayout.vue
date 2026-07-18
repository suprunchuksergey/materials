<script setup lang="ts">
import AdminSidebar from "@/components/admin/AdminSidebar.vue";
import AdminHeader from "@/components/admin/AdminHeader.vue";
</script>

<template>
  <div class="min-h-screen bg-neutral-50 flex">
    <AdminSidebar />
    <div class="flex-1 flex flex-col min-w-0">
      <AdminHeader />
      <main class="flex-1 p-8">
        <router-view />
      </main>
    </div>
  </div>
</template>
