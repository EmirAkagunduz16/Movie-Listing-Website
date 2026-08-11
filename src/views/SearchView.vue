<script setup lang="ts">
import { watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import MovieListLayout from '@/components/layout/MovieListLayout.vue'
import { useMovieStore } from '@/stores/movieStore'
import { MagnifyingGlassIcon, FilmIcon } from '@heroicons/vue/24/outline'

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
    @retry="onRetry"
    @page-change="onPageChange"
  >
    <!-- Custom Empty State for Search -->
    <template #empty>
      <div
        class="flex flex-col items-center justify-center py-20 px-4 bg-gray-900/40 rounded-2xl border border-gray-800 text-center"
      >
        <div class="w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center mb-4 text-indigo-400">
          <MagnifyingGlassIcon class="size-8" />
        </div>
        <h3 class="text-xl font-bold text-white mb-2">
          {{ queryParam ? `No Movies Found for "${queryParam}"` : 'Type a Movie Title to Search' }}
        </h3>
        <p class="text-gray-400 text-sm max-w-md mb-6">
          {{ queryParam ? 'Try checking for spelling errors or searching with a different movie name.' : 'Use the search bar above to discover films across the entire TMDB catalog.' }}
        </p>
        <RouterLink
          to="/"
          class="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-xl transition-colors shadow-lg"
        >
          <FilmIcon class="size-4" />
          <span>Browse Popular Movies</span>
        </RouterLink>
      </div>
    </template>
  </MovieListLayout>
</template>
