<script setup lang="ts">
import { storeToRefs } from 'pinia'
import MovieListLayout from '@/components/layout/MovieListLayout.vue'
import { useMovieStore } from '@/stores/movieStore'
import { HeartIcon, FilmIcon } from '@heroicons/vue/24/outline'

const movieStore = useMovieStore()
const { favoriteMovies } = storeToRefs(movieStore)
</script>

<template>
  <MovieListLayout
    hero-title="Favorite Movies"
    hero-subtitle="Your personal collection of saved films. Easily access your top picks anytime."
    section-title="Your Saved Collection"
    :section-info="`${favoriteMovies.length} saved films`"
    accent-color="#ef4444"
    :movies="favoriteMovies"
    :loading="false"
    :error="null"
    :is-favorite-fn="movieStore.isFavorite"
    @toggle-favorite="movieStore.toggleFavorite"
  >
    <!-- Custom Empty State for Favorites -->
    <template #empty>
      <div
        class="flex flex-col items-center justify-center py-20 px-4 bg-gray-900/40 rounded-2xl border border-gray-800 text-center"
      >
        <div class="w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center mb-4 text-red-400">
          <HeartIcon class="size-8" />
        </div>
        <h3 class="text-xl font-bold text-white mb-2">No Favorite Movies Yet</h3>
        <p class="text-gray-400 text-sm max-w-md mb-6">
          You haven't saved any movies to your favorites. Explore popular movies and click "Add to Favorites" on any movie page!
        </p>
        <RouterLink
          to="/"
          class="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-xl transition-colors shadow-lg"
        >
          <FilmIcon class="size-4" />
          <span>Explore Movies</span>
        </RouterLink>
      </div>
    </template>
  </MovieListLayout>
</template>
