<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useUserStore } from "@/stores/user";
import FormField from "@/components/admin/FormField.vue";
import PageHeader from "@/components/common/PageHeader.vue";

const userStore = useUserStore();

const form = reactive({ name: "", phone: "", email: "" });
const isSaved = ref(false);

onMounted(async () => {
  await userStore.fetchCurrentUser();
  form.name = userStore.currentUser?.name ?? "";
  form.phone = userStore.currentUser?.phone ?? "";
  form.email = userStore.currentUser?.email ?? "";
});

async function handleSave() {
  await userStore.updateProfile(form);
  isSaved.value = true;
}
</script>

<template>
  <div>
    <PageHeader title="Настройки профиля" />
    <div
      class="rounded-xl border border-neutral-200 bg-white p-6 max-w-md space-y-4"
    >
      <FormField label="Имя" v-model="form.name" />
      <FormField label="Телефон" v-model="form.phone" />
      <FormField label="Email" v-model="form.email" />
      <button
        class="px-4 py-2 rounded-lg bg-neutral-900 text-white text-sm hover:bg-neutral-800"
        @click="handleSave"
      >
        Сохранить изменения
      </button>
      <p v-if="isSaved" class="text-xs text-emerald-600">
        Изменения сохранены.
      </p>
    </div>
  </div>
</template>
