<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  (e: 'page-change', page: number): void
}>()

// Calculate dynamic page numbers for pagination
const visiblePages = computed(() => {
  const current = props.currentPage
  const max = props.totalPages
  const pages: number[] = []

  let start = Math.max(1, current - 2)
  let end = Math.min(max, start + 4)

  if (end - start < 4) {
    start = Math.max(1, end - 4)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const lastVisiblePage = computed(() => visiblePages.value[visiblePages.value.length - 1] ?? 0)

function onPageClick(page: number) {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('page-change', page)
  }
}
</script>

<template>
  <div class="d-flex flex-column align-items-center gap-2 mt-5">
    <nav aria-label="Movie pagination">
      <ul class="pagination mb-0">
        <!-- Prev Button -->
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button
            class="page-link d-flex align-items-center gap-1"
            @click="onPageClick(currentPage - 1)"
            :disabled="currentPage === 1"
          >
            <i class="bi bi-chevron-left small"></i>
            <span class="d-none d-sm-inline">Prev</span>
          </button>
        </li>

        <!-- Page Numbers -->
        <li
          v-for="page in visiblePages"
          :key="page"
          class="page-item"
          :class="{ active: currentPage === page }"
        >
          <button
            class="page-link fw-semibold"
            @click="onPageClick(page)"
          >
            {{ page }}
          </button>
        </li>

        <!-- Ellipsis -->
        <li v-if="lastVisiblePage < totalPages" class="page-item disabled">
          <span class="page-link">...</span>
        </li>

        <!-- Last Page -->
        <li
          v-if="lastVisiblePage < totalPages"
          class="page-item"
          :class="{ active: currentPage === totalPages }"
        >
          <button
            class="page-link fw-semibold"
            @click="onPageClick(totalPages)"
          >
            {{ totalPages }}
          </button>
        </li>

        <!-- Next Button -->
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button
            class="page-link d-flex align-items-center gap-1"
            @click="onPageClick(currentPage + 1)"
            :disabled="currentPage === totalPages"
          >
            <span class="d-none d-sm-inline">Next</span>
            <i class="bi bi-chevron-right small"></i>
          </button>
        </li>
      </ul>
    </nav>

    <!-- Page info -->
    <p class="text-body-tertiary small mb-0">
      Page {{ currentPage }} of {{ totalPages }}
    </p>
  </div>
</template>
