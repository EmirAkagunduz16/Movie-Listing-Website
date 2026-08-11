<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Navbar from '@/components/Navbar.vue'
import HeroSection from '@/components/HeroSection.vue'
import MovieCard from '@/components/MovieCard.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useMovieStore } from '@/stores/movieStore'
import { HeartIcon, FilmIcon } from '@heroicons/vue/24/outline'

const movieStore = useMovieStore()
const { favoriteMovies } = storeToRefs(movieStore)
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-white flex flex-col justify-between">
    <div>
      <Navbar />
      <HeroSection
        title="Favorite Movies"
        subtitle="Your personal collection of saved films. Easily access your top picks anytime."
      />

      <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <!-- Section Header -->
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-3">
            <div class="w-1 h-7 bg-red-500 rounded-full"></div>
            <h2 class="text-xl font-bold text-white">Your Saved Collection</h2>
          </div>
          <span class="text-sm text-gray-500">{{ favoriteMovies.length }} saved films</span>
        </div>

        <!-- Favorites Grid -->
        <div
          v-if="favoriteMovies.length > 0"
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
        >
          <MovieCard
            v-for="movie in favoriteMovies"
            :key="movie.id"
            :movie="movie"
          />
        </div>

        <!-- Empty State -->
        <div
          v-else
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
      </main>
    </div>

    <AppFooter />
  </div>
</template>
