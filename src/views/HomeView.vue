<script setup lang="ts">
import { watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import MovieListLayout from '@/components/layout/MovieListLayout.vue'
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
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function onRetry() {
  movieStore.fetchMovies(props.category, currentPage.value)
}
</script>

<template>
  <MovieListLayout
    :hero-title="pageTitle"
    :hero-subtitle="pageSubtitle"
    :section-title="pageTitle"
    :section-info="`${movies.length} films on page`"
    :movies="movies"
    :loading="loading"
    :error="error"
    :current-page="currentPage"
    :total-pages="totalPages"
    @retry="onRetry"
    @page-change="onPageChange"
  />
</template>