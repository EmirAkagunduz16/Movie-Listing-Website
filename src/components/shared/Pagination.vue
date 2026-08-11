<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid'
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
  <div class="mt-12 flex flex-col items-center gap-4">
    <div class="flex items-center justify-center gap-2">
      <!-- Prev Button -->
      <button
        @click="onPageClick(currentPage - 1)"
        :disabled="currentPage === 1"
        class="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 text-sm font-medium border border-gray-700 hover:bg-gray-700 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
      >
        <ChevronLeftIcon class="size-4" />
        <span class="hidden sm:inline">Prev</span>
      </button>

      <!-- Page Numbers -->
      <div class="flex items-center gap-1">
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="onPageClick(page)"
          :class="[
            'w-9 h-9 rounded-lg text-sm font-semibold transition-all duration-150',
            currentPage === page
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50'
              : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700 hover:text-white'
          ]"
        >
          {{ page }}
        </button>

        <span v-if="lastVisiblePage < totalPages" class="text-gray-600 px-1">...</span>

        <button
          v-if="lastVisiblePage < totalPages"
          @click="onPageClick(totalPages)"
          :class="[
            'w-9 h-9 rounded-lg text-sm font-semibold transition-all duration-150',
            currentPage === totalPages
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700 hover:text-white'
          ]"
        >
          {{ totalPages }}
        </button>
      </div>

      <!-- Next Button -->
      <button
        @click="onPageClick(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 text-sm font-medium border border-gray-700 hover:bg-gray-700 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
      >
        <span class="hidden sm:inline">Next</span>
        <ChevronRightIcon class="size-4" />
      </button>
    </div>

    <!-- Page info -->
    <p class="text-center text-xs text-gray-600">
      Page {{ currentPage }} of {{ totalPages }}
    </p>
  </div>
</template>
