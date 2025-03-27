<template>
  <nav
    class="flex flex-wrap m-6 items-center justify-center gap-2 mt-4"
    aria-label="ページネーション"
  >
    <!-- 最初へ -->
    <button class="pagination-button" :disabled="currentPage === 1" @click="changePage(1)">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M18.33 19L19 18.33L12.67 12L19 5.67L18.33 5L11.33 12L18.33 19Z" fill="#1A3EE8" />
        <rect width="1" height="14" transform="matrix(1 0 0 -1 6 19)" fill="#1A3EE8" />
      </svg>
    </button>

    <!-- 前へ -->
    <button
      class="pagination-button"
      :disabled="currentPage === 1"
      @click="changePage(currentPage - 1)"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15.33 19L16 18.33L9.67 12L16 5.67L15.33 5L8.33 12L15.33 19Z" fill="#1A3EE8" />
      </svg>
    </button>

    <!-- 最初のページ -->
    <button
      v-if="pages[0] > 1"
      class="pagination-button"
      :class="{ 'pagination-current': currentPage === 1 }"
      @click="changePage(1)"
    >
      1
    </button>
    <span v-if="pages[0] > 2" class="pagination-ellipsis">…</span>

    <!-- 中央部分 -->
    <button
      v-for="page in pages"
      :key="page"
      class="pagination-button"
      :class="{ 'pagination-current': page === currentPage }"
      @click="changePage(page)"
    >
      {{ page }}
    </button>

    <!-- 最後のページ -->
    <span v-if="pages[pages.length - 1] < totalPages - 1" class="pagination-ellipsis">…</span>
    <button
      v-if="pages[pages.length - 1] < totalPages"
      class="pagination-button"
      :class="{ 'pagination-current': currentPage === totalPages }"
      @click="changePage(totalPages)"
    >
      {{ totalPages }}
    </button>

    <!-- 次へ -->
    <button
      class="pagination-button"
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M8.67 19L8 18.33L14.33 12L8 5.67L8.67 5L15.67 12L8.67 19Z" fill="#1A3EE8" />
      </svg>
    </button>

    <!-- 最後へ -->
    <button
      class="pagination-button"
      :disabled="currentPage === totalPages"
      @click="changePage(totalPages)"
    >
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        aria-label="最後のページに移動する"
      >
        <path d="M5.67 5L5 5.67L11.33 12L5 18.33L5.67 19L12.67 12L5.67 5Z" fill="#1A3EE8" />
        <rect width="1" height="14" fill="#1A3EE8" transform="translate(17 5)" />
      </svg>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  totalItems: number
  itemsPerPage: number
  currentPage: number
  maxVisiblePages?: number
}>()

const emit = defineEmits(['pageChange'])

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage))

const visibleCount = computed(() => props.maxVisiblePages ?? 5)

const pages = computed(() => {
  const half = Math.floor(visibleCount.value / 2)
  let start = props.currentPage - half
  let end = props.currentPage + half

  if (start < 2) {
    start = 2
    end = Math.min(start + visibleCount.value - 1, totalPages.value - 1)
  }
  if (end > totalPages.value - 1) {
    end = totalPages.value - 1
    start = Math.max(2, end - visibleCount.value + 1)
  }

  const range = []
  for (let i = start; i <= end; i++) {
    range.push(i)
  }
  return range
})

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('pageChange', page)
  }
}
</script>

<style scoped>
.pagination-button {
  @apply h-12 w-12 flex items-center justify-center rounded-full border border-solid-gray-200 text-oln-16N-100 text-blue-1000
    hover:border-blue-900 hover:bg-blue-50
    focus-visible:outline focus-visible:outline-2 focus-visible:outline-yellow-300
    active:border-blue-900 active:bg-blue-50
    disabled:border-solid-gray-200 disabled:text-solid-gray-300;
}

.pagination-current {
  @apply bg-blue-900 text-white border-blue-900 pointer-events-none;
}

.pagination-ellipsis {
  @apply px-2 text-solid-gray-600 text-oln-16N-100;
}
</style>
