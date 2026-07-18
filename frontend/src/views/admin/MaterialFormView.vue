<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMaterialsStore } from "@/stores/materials";
import { useCategoriesStore } from "@/stores/categories";
import { manufacturersMock } from "@/mocks/manufacturers.mock";
import PageHeader from "@/components/common/PageHeader.vue";
import FormField from "@/components/admin/FormField.vue";
import ImageUploader from "@/components/admin/ImageUploader.vue";
import type { MaterialImage } from "@/types";

const route = useRoute();
const router = useRouter();
const materialsStore = useMaterialsStore();
const categoriesStore = useCategoriesStore();

const isEditing = computed(() => Boolean(route.params.id));
const tabs = ["Основное", "Характеристики", "Изображения", "SEO"] as const;
const activeTab = ref<(typeof tabs)[number]>("Основное");

const form = reactive({
  title: "",
  categoryId: "",
  manufacturerId: "",
  price: 0,
  unit: "шт.",
  description: "",
  countryOfOrigin: "",
  deliveryDays: "3-5 дней",
  seoTitle: "",
  seoDescription: "",
});

const images = ref<MaterialImage[]>([]);

onMounted(async () => {
  await Promise.all([
    materialsStore.fetchMaterials(),
    categoriesStore.fetchCategories(),
  ]);
  if (isEditing.value) {
    const material = materialsStore.getMaterialById(route.params.id as string);
    if (material) {
      Object.assign(form, material);
      images.value = material.images;
    }
  }
});

function handleAddImage() {
  images.value.push({
    id: `img-${Date.now()}`,
    url: `https://picsum.photos/seed/new-${Date.now()}/600/600`,
    alt: form.title,
  });
}

function handleRemoveImage(id: string) {
  images.value = images.value.filter((image) => image.id !== id);
}

async function handleSubmit() {
  const payload = {
    ...form,
    images: images.value,
    colors: [],
    sizes: [],
    characteristics: [],
    collection: form.title,
    isActive: true,
    isPopular: false,
  };

  if (isEditing.value) {
    await materialsStore.updateMaterial(route.params.id as string, payload);
  } else {
    await materialsStore.createMaterial(payload as any);
  }
  router.push({ name: "admin-materials" });
}
</script>

<template>
  <div>
    <PageHeader
      :title="isEditing ? 'Редактирование материала' : 'Добавление материала'"
    />

    <div class="rounded-xl border border-neutral-200 bg-white">
      <div class="flex border-b border-neutral-100 px-6">
        <button
          v-for="tab in tabs"
          :key="tab"
          class="px-4 py-3 text-sm border-b-2 -mb-px transition-colors"
          :class="
            activeTab === tab
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-500'
          "
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </div>

      <div class="p-6 space-y-4">
        <template v-if="activeTab === 'Основное'">
          <FormField
            label="Название"
            v-model="form.title"
            placeholder="Введите название материала"
          />
          <div class="grid grid-cols-2 gap-4">
            <label class="block">
              <span class="text-sm text-neutral-700 mb-1.5 block"
                >Категория</span
              >
              <select
                v-model="form.categoryId"
                class="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm"
              >
                <option value="" disabled>Выберите категорию</option>
                <option
                  v-for="category in categoriesStore.categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </label>
            <label class="block">
              <span class="text-sm text-neutral-700 mb-1.5 block"
                >Производитель</span
              >
              <select
                v-model="form.manufacturerId"
                class="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm"
              >
                <option value="" disabled>Выберите производителя</option>
                <option
                  v-for="manufacturer in manufacturersMock"
                  :key="manufacturer.id"
                  :value="manufacturer.id"
                >
                  {{ manufacturer.name }}
                </option>
              </select>
            </label>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <FormField label="Цена" type="number" v-model="form.price" />
            <FormField label="Единица измерения" v-model="form.unit" />
          </div>
          <FormField
            label="Описание"
            type="textarea"
            v-model="form.description"
            placeholder="Введите описание материала"
          />
        </template>

        <template v-else-if="activeTab === 'Характеристики'">
          <FormField
            label="Страна происхождения"
            v-model="form.countryOfOrigin"
          />
          <FormField label="Срок доставки" v-model="form.deliveryDays" />
        </template>

        <template v-else-if="activeTab === 'Изображения'">
          <ImageUploader
            :images="images"
            @add="handleAddImage"
            @remove="handleRemoveImage"
          />
        </template>

        <template v-else>
          <FormField label="SEO заголовок" v-model="form.seoTitle" />
          <FormField
            label="SEO описание"
            type="textarea"
            v-model="form.seoDescription"
          />
        </template>
      </div>

      <div class="flex justify-end gap-3 px-6 py-4 border-t border-neutral-100">
        <button
          class="px-4 py-2 rounded-lg border border-neutral-200 text-neutral-700 text-sm hover:bg-neutral-50"
          @click="router.push({ name: 'admin-materials' })"
        >
          Отмена
        </button>
        <button
          class="px-4 py-2 rounded-lg bg-neutral-900 text-white text-sm hover:bg-neutral-800"
          @click="handleSubmit"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>
