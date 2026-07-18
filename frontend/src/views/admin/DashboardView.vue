<script setup lang="ts">
import { Boxes, FolderTree, ClipboardList, Users } from "lucide-vue-next";
import { useAdminStore } from "@/stores/admin";
import PageHeader from "@/components/common/PageHeader.vue";
import StatCard from "@/components/common/StatCard.vue";

const adminStore = useAdminStore();

const icons = [Users, Boxes, ClipboardList, FolderTree];
</script>

<template>
  <div>
    <PageHeader
      title="Панель управления"
      subtitle="Общая статистика по каталогу и подборкам"
    />
    <div class="grid grid-cols-4 gap-5">
      <StatCard
        v-for="(stat, index) in adminStore.stats"
        :key="stat.label"
        :icon="icons[index]"
        :label="stat.label"
        :value="stat.value"
      />
    </div>
  </div>
</template>
