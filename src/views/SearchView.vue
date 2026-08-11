<script setup lang="ts">
import { watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import Navbar from '@/components/Navbar.vue'
import HeroSection from '@/components/HeroSection.vue'
import MovieCard from '@/components/MovieCard.vue'
import SkeletonLoader from '@/components/SkeletonLoader.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import Pagination from '@/components/Pagination.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useMovieStore } from '@/stores/movieStore'
import { MagnifyingGlassIcon, FilmIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()
const movieStore = useMovieStore()
const { searchResults, searchLoading, error, searchCurrentPage, searchTotalPages, searchTotalResults } = storeToRefs(movieStore)

const queryParam = computed(() => (route.query.q as string) || '')
const pageParam = computed(() => Number(route.query.page) || 1)

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
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-white flex flex-col justify-between">
    <div>
      <Navbar />

      <HeroSection
        :title="queryParam ? `Search: &quot;${queryParam}&quot;` : 'Search Movies'"
        :subtitle="queryParam ? `Explore films matching your search query &quot;${queryParam}&quot;.` : 'Find your favorite movies by title.'"
      />

      <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <!-- Section Header -->
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-3">
            <div class="w-1 h-7 bg-indigo-500 rounded-full"></div>
            <h2 class="text-xl font-bold text-white">
              {{ queryParam ? `Results for &quot;${queryParam}&quot;` : 'Search Results' }}
            </h2>
          </div>
          <span v-if="!searchLoading && queryParam" class="text-sm text-gray-500">
            {{ searchTotalResults }} movies found
          </span>
        </div>

        <!-- Loading State -->
        <SkeletonLoader v-if="searchLoading" :count="12" />

        <!-- Error State -->
        <ErrorMessage
          v-else-if="error"
          :message="error"
          @retry="movieStore.performSearch(queryParam, searchCurrentPage)"
        />

        <!-- Empty State (No query or No results) -->
        <div
          v-else-if="!queryParam || searchResults.length === 0"
          class="flex flex-col items-center justify-center py-20 px-4 bg-gray-900/40 rounded-2xl border border-gray-800 text-center"
        >
          <div class="w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center mb-4 text-indigo-400">
            <MagnifyingGlassIcon class="size-8" />
          </div>
          <h3 class="text-xl font-bold text-white mb-2">
            {{ queryParam ? `No Movies Found for &quot;${queryParam}&quot;` : 'Type a Movie Title to Search' }}
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

        <!-- Movie Grid -->
        <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          <MovieCard
            v-for="movie in searchResults"
            :key="movie.id"
            :movie="movie"
          />
        </div>

        <!-- Pagination -->
        <Pagination
          v-if="!searchLoading && !error && searchResults.length > 0 && searchTotalPages > 1"
          :current-page="searchCurrentPage"
          :total-pages="searchTotalPages"
          @page-change="onPageChange"
        />
      </main>
    </div>

    <AppFooter />
  </div>
</template>
