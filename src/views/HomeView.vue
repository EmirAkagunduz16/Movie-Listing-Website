<script setup lang="ts">
import { watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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

const route = useRoute()
const router = useRouter()

const activeCategoryConfig = computed(() => MOVIE_CATEGORIES[props.category] || MOVIE_CATEGORIES.popular)
const pageTitle = computed(() => props.title || activeCategoryConfig.value.title)
const pageSubtitle = computed(() => props.subtitle || activeCategoryConfig.value.subtitle)

// Read current page from URL query param (?page=X), fallback to 1
const pageParam = computed(() => Number(route.query.page) || 1)

const movieStore = useMovieStore()
const { movies, loading, error, currentPage, totalPages } = storeToRefs(movieStore)

// Watch both category and URL page param — fetch when either changes
watch(
  [() => props.category, pageParam],
  ([newCategory, newPage]) => {
    movieStore.fetchMovies(newCategory, newPage)
  },
  { immediate: true }
)

function onPageChange(page: number) {
  // Update URL with page query param — router.back() will restore this
  router.push({ query: { ...route.query, page: page === 1 ? undefined : page } })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function onRetry() {
  movieStore.fetchMovies(props.category, pageParam.value)
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
    :is-favorite-fn="movieStore.isFavorite"
    @retry="onRetry"
    @page-change="onPageChange"
    @toggle-favorite="movieStore.toggleFavorite"
  />
</template>