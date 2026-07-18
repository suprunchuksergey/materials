<script setup lang="ts">
import { ref } from "vue";
import { Phone, Mail, MapPin, Clock } from "lucide-vue-next";

const name = ref("");
const email = ref("");
const message = ref("");
const isSent = ref(false);

const contacts = [
  { icon: Phone, label: "+7 (999) 123-45-67" },
  { icon: Mail, label: "info@buildchoice.ru" },
  { icon: MapPin, label: "г. Москва, ул. Строителей, 15" },
  { icon: Clock, label: "Пн-Пт: 9:00 - 18:00, Сб: 10:00 - 16:00" },
];

function handleSubmit() {
  isSent.value = true;
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-8 py-14">
    <h1 class="text-2xl font-semibold text-neutral-900 mb-10">Контакты</h1>

    <div class="grid grid-cols-2 gap-14">
      <div class="space-y-6">
        <div
          v-for="contact in contacts"
          :key="contact.label"
          class="flex items-center gap-3 text-sm text-neutral-700"
        >
          <div
            class="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-700"
          >
            <component :is="contact.icon" :size="16" />
          </div>
          {{ contact.label }}
        </div>

        <div class="rounded-xl border border-neutral-200 bg-white p-5 mt-8">
          <p class="text-sm font-medium text-neutral-900 mb-4">Напишите нам</p>
          <form class="space-y-3" @submit.prevent="handleSubmit">
            <input
              v-model="name"
              placeholder="Имя"
              class="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm"
            />
            <input
              v-model="email"
              placeholder="Email"
              class="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm"
            />
            <textarea
              v-model="message"
              placeholder="Сообщение"
              rows="4"
              class="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm"
            />
            <button
              type="submit"
              class="w-full px-4 py-2.5 rounded-lg bg-neutral-900 text-white text-sm hover:bg-neutral-800"
            >
              Отправить сообщение
            </button>
            <p v-if="isSent" class="text-xs text-emerald-600">
              Сообщение отправлено.
            </p>
          </form>
        </div>
      </div>

      <div
        class="rounded-xl overflow-hidden border border-neutral-200 h-full min-h-[420px] bg-neutral-100"
      >
        <iframe
          class="w-full h-full"
          title="Карта"
          src="https://maps.google.com/maps?q=Moscow&t=&z=13&ie=UTF8&iwloc=&output=embed"
        />
      </div>
    </div>
  </div>
</template>
