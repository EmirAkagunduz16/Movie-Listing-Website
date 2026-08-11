<script setup lang="ts">
import { watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import Navbar from '@/components/Navbar.vue'
import HeroSection from '@/components/HeroSection.vue'
import MovieCard from '@/components/MovieCard.vue'
import SkeletonLoader from '@/components/SkeletonLoader.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import Pagination from '@/components/Pagination.vue'
import AppFooter from '@/components/AppFooter.vue'
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

const activeCategoryConfig = computed(() => MOVIE_CATEGORIES[props.category] || MOVIE_CATEGORIES.popular)
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

function onPageChange(page: number) {
  movieStore.fetchMovies(props.category, page)
}
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-white">
    <Navbar />
    <HeroSection :title="pageTitle" :subtitle="pageSubtitle" />

    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <!-- Section Header -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-3">
          <div class="w-1 h-7 bg-indigo-500 rounded-full"></div>
          <h2 class="text-xl font-bold text-white">{{ pageTitle }}</h2>
        </div>
        <span v-if="!loading" class="text-sm text-gray-500">{{ movies.length }} films on page</span>
      </div>

      <!-- Loading State -->
      <SkeletonLoader v-if="loading" :count="12" />

      <!-- Error State -->
      <ErrorMessage
        v-else-if="error"
        :message="error"
        @retry="movieStore.fetchMovies(props.category, currentPage)"
      />

      <!-- Movie Grid -->
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        <MovieCard
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
        />
      </div>

      <!-- Pagination -->
      <Pagination
        v-if="!loading && !error && totalPages > 1"
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="onPageChange"
      />
    </main>

    <AppFooter />
  </div>
</template>