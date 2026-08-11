<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import MovieCard from '@/components/MovieCard.vue'
import { ChevronLeftIcon, ChevronRightIcon, ArrowPathIcon } from '@heroicons/vue/24/solid'
import { watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMovieStore } from '@/stores/movieStore'
import { MOVIE_CATEGORIES } from '@/constants/categories'
import type { MovieCategory } from '@/types'

const props = withDefaults(
  defineProps<{
    category?: MovieCategory
    title?: string
    subtitle?: string
  }>(),
  {
    category: 'popular',
  }
)

const activeCategoryConfig = computed(() => {
  return MOVIE_CATEGORIES[props.category] || MOVIE_CATEGORIES.popular
})

const pageTitle = computed(() => props.title || activeCategoryConfig.value.title)
const pageSubtitle = computed(() => props.subtitle || activeCategoryConfig.value.subtitle)

const movieStore = useMovieStore()
const { movies, loading, error, currentPage, totalPages } = storeToRefs(movieStore)

// Watch category prop and fetch movies dynamically
watch(
  () => props.category,
  (newCategory) => {
    movieStore.fetchMovies(newCategory, 1)
  },
  { immediate: true }
)

function changePage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    movieStore.fetchMovies(props.category, page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Calculate dynamic page numbers for pagination
const visiblePages = computed(() => {
  const current = currentPage.value
  const max = totalPages.value
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
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-white">
    <Navbar />

    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950 border-b border-gray-800">
      <div class="absolute inset-0 bg-[url('https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg')] bg-cover bg-center opacity-10"></div>
      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div class="max-w-2xl">
          <p class="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">Discover</p>
          <h1 class="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            {{ pageTitle }}
          </h1>
          <p class="text-gray-400 text-lg leading-relaxed">
            {{ pageSubtitle }}
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">

      <!-- Section Header -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-3">
          <div class="w-1 h-7 bg-indigo-500 rounded-full"></div>
          <h2 class="text-xl font-bold text-white">{{ pageTitle }}</h2>
        </div>
        <span class="text-sm text-gray-500" v-if="!loading">{{ movies.length }} films on page</span>
      </div>

      <!-- Loading State (Skeleton Grid) -->
      <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        <div v-for="i in 12" :key="i" class="bg-gray-900 rounded-xl overflow-hidden animate-pulse border border-gray-800">
          <div class="aspect-[2/3] bg-gray-800"></div>
          <div class="p-3 space-y-2">
            <div class="h-4 bg-gray-800 rounded w-3/4"></div>
            <div class="h-3 bg-gray-800 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="flex flex-col items-center justify-center py-16 bg-gray-900/50 rounded-2xl border border-gray-800">
        <p class="text-red-400 text-lg mb-4">{{ error }}</p>
        <button
          @click="movieStore.fetchMovies(props.category, currentPage)"
          class="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-medium transition-colors"
        >
          <ArrowPathIcon class="size-4" />
          <span>Tekrar Deneyin</span>
        </button>
      </div>

      <!-- Movie Grid -->
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        <MovieCard
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
        />
      </div>

      <!-- Pagination -->
      <div v-if="!loading && !error && totalPages > 1" class="mt-12 flex items-center justify-center gap-2">
        <!-- Prev Button -->
        <button
          @click="changePage(currentPage - 1)"
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
            @click="changePage(page)"
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
            @click="changePage(totalPages)"
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
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 text-sm font-medium border border-gray-700 hover:bg-gray-700 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
        >
          <span class="hidden sm:inline">Next</span>
          <ChevronRightIcon class="size-4" />
        </button>
      </div>

      <!-- Page info -->
      <p v-if="!loading && !error" class="mt-4 text-center text-xs text-gray-600">
        Page {{ currentPage }} of {{ totalPages }}
      </p>

    </main>

    <!-- Footer -->
    <footer class="border-t border-gray-800 mt-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <div class="flex items-center justify-center w-6 h-6 rounded bg-indigo-600">
              <svg class="size-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
            </div>
            <span class="text-gray-400 text-sm font-medium">CineVault</span>
          </div>
          <p class="text-gray-600 text-xs">
            Powered by
            <a href="https://www.themoviedb.org/" target="_blank" class="text-indigo-500 hover:text-indigo-400 transition-colors">TMDB API</a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>