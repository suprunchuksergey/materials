import { ref, computed, type Ref } from "vue";

export function usePagination<T>(items: Ref<T[]>, pageSize = 8) {
  const currentPage = ref(1);

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(items.value.length / pageSize)),
  );

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return items.value.slice(start, start + pageSize);
  });

  function goToPage(page: number) {
    currentPage.value = Math.min(Math.max(1, page), totalPages.value);
  }

  return { currentPage, totalPages, paginatedItems, goToPage };
}
