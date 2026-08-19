<script setup lang="ts">
import { watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import MovieListLayout from '@/components/layout/MovieListLayout.vue'
import EmptyState from '@/components/shared/EmptyState.vue'
import { useMovieStore } from '@/stores/movieStore'

const route = useRoute()
const router = useRouter()
const movieStore = useMovieStore()
const { searchResults, searchLoading, error, searchCurrentPage, searchTotalPages, searchTotalResults } = storeToRefs(movieStore)

const queryParam = computed(() => (route.query.q as string) || '')
const pageParam = computed(() => Number(route.query.page) || 1)

const heroTitle = computed(() =>
  queryParam.value ? `Search: "${queryParam.value}"` : 'Search Movies'
)
const heroSubtitle = computed(() =>
  queryParam.value
    ? `Explore films matching your search query "${queryParam.value}".`
    : 'Find your favorite movies by title.'
)
const sectionTitle = computed(() =>
  queryParam.value ? `Results for "${queryParam.value}"` : 'Search Results'
)
const sectionInfo = computed(() =>
  queryParam.value ? `${searchTotalResults.value} movies found` : ''
)

watch(
  [queryParam, pageParam],
  ([newQuery, newPage]) => {
    if (newQuery) {
      movieStore.performSearch(newQuery, newPage)
    }
  },
  { immediate: true }
)

function onPageChange(page: number) {
  router.push({
    path: '/search',
    query: { q: queryParam.value, page },
  })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function onRetry() {
  movieStore.performSearch(queryParam.value, searchCurrentPage.value)
}
</script>

<template>
  <MovieListLayout
    :hero-title="heroTitle"
    :hero-subtitle="heroSubtitle"
    :section-title="sectionTitle"
    :section-info="sectionInfo"
    :movies="searchResults"
    :loading="searchLoading"
    :error="error"
    :current-page="searchCurrentPage"
    :total-pages="searchTotalPages"
    :is-favorite-fn="movieStore.isFavorite"
    @retry="onRetry"
    @page-change="onPageChange"
    @toggle-favorite="movieStore.toggleFavorite"
  >
    <!-- Custom Empty State for Search -->
    <template #empty>
      <EmptyState
        icon="bi-search"
        icon-color-class="text-indigo"
        :title="queryParam ? `No Movies Found for &quot;${queryParam}&quot;` : 'Type a Movie Title to Search'"
        :description="queryParam ? 'Try checking for spelling errors or searching with a different movie name.' : 'Use the search bar above to discover films across the entire TMDB catalog.'"
        action-text="Browse Popular Movies"
        action-to="/"
        action-icon="bi-film"
      />
    </template>
  </MovieListLayout>
</template>
