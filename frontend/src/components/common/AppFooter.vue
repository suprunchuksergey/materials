<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="border-t border-neutral-200 bg-white mt-auto">
    <div
      class="max-w-7xl mx-auto px-8 py-8 flex items-center justify-between text-sm text-neutral-500"
    >
      <span>© {{ year }} BuildChoice. Все права защищены.</span>
      <div class="flex gap-6">
        <router-link
          to="/about"
          class="hover:text-neutral-900 transition-colors"
          >О компании</router-link
        >
        <router-link
          to="/contacts"
          class="hover:text-neutral-900 transition-colors"
          >Контакты</router-link
        >
      </div>
    </div>
  </footer>
</template>
