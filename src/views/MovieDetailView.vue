<script setup lang="ts">
import { watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { StarIcon, CalendarIcon, ClockIcon, HeartIcon as HeartIconSolid } from '@heroicons/vue/24/solid'
import { HeartIcon as HeartIconOutline, ArrowLeftIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'
import Navbar from '@/components/Navbar.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useMovieStore } from '@/stores/movieStore'
import { formatDate, formatRuntime, getRatingColor, getTMDBImageUrl } from '@/utils/formatters'

const route = useRoute()
const movieStore = useMovieStore()
const { currentMovie, movieLoading, error } = storeToRefs(movieStore)

const movieId = computed(() => route.params.id as string)

watch(
  movieId,
  (newId) => {
    if (newId) {
      movieStore.fetchMovieDetails(newId)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
  { immediate: true }
)

const isFav = computed(() => {
  return currentMovie.value ? movieStore.isFavorite(currentMovie.value.id) : false
})

function toggleFav() {
  if (currentMovie.value) {
    movieStore.toggleFavorite(currentMovie.value.id)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-white flex flex-col justify-between">
    <div>
      <Navbar />

      <!-- Loading State -->
      <div v-if="movieLoading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse">
        <div class="flex flex-col md:flex-row gap-8 items-start">
          <div class="w-64 sm:w-80 aspect-[2/3] bg-gray-800 rounded-2xl"></div>
          <div class="flex-1 space-y-4 w-full">
            <div class="h-4 bg-gray-800 rounded w-1/4"></div>
            <div class="h-10 bg-gray-800 rounded w-3/4"></div>
            <div class="flex gap-3">
              <div class="h-8 w-20 bg-gray-800 rounded-full"></div>
              <div class="h-8 w-28 bg-gray-800 rounded-full"></div>
              <div class="h-8 w-24 bg-gray-800 rounded-full"></div>
            </div>
            <div class="h-20 bg-gray-800 rounded w-full"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="max-w-4xl mx-auto px-4 py-20 text-center">
        <p class="text-red-400 text-lg mb-6">{{ error }}</p>
        <button
          @click="movieStore.fetchMovieDetails(movieId)"
          class="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-medium transition-colors"
        >
          <ArrowPathIcon class="size-4" />
          <span>Retry Loading</span>
        </button>
      </div>

      <!-- Movie Details Content -->
      <div v-else-if="currentMovie" class="relative">
        <!-- Backdrop Banner with Overlay -->
        <div class="relative min-h-[70vh] flex items-center overflow-hidden">
          <!-- Backdrop Image -->
          <div
            v-if="currentMovie.backdrop_path"
            class="absolute inset-0 bg-cover bg-center opacity-25 scale-105 filter blur-sm transform transition-all duration-700"
            :style="{ backgroundImage: `url(${getTMDBImageUrl(currentMovie.backdrop_path, 'original')})` }"
          ></div>
          <div class="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-gray-950/40"></div>

          <!-- Main Content Container -->
          <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
            
            <!-- Back Button -->
            <RouterLink
              to="/"
              class="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors bg-gray-900/60 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-gray-800"
            >
              <ArrowLeftIcon class="size-4" />
              <span>Back to Movies</span>
            </RouterLink>

            <div class="flex flex-col md:flex-row gap-8 lg:gap-12 items-center md:items-start">
              
              <!-- Movie Poster -->
              <div class="shrink-0 w-64 sm:w-80 shadow-2xl rounded-2xl overflow-hidden border border-gray-800/80 bg-gray-900 group">
                <img
                  v-if="currentMovie.poster_path"
                  :src="getTMDBImageUrl(currentMovie.poster_path, 'w500')!"
                  :alt="currentMovie.title"
                  class="w-full h-auto object-cover rounded-2xl shadow-indigo-950/30"
                />
                <div v-else class="w-full aspect-[2/3] flex items-center justify-center bg-gray-800">
                  <svg class="w-20 h-20 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                  </svg>
                </div>
              </div>

              <!-- Movie Details Info -->
              <div class="flex-1 text-left">
                
                <!-- Tagline -->
                <p v-if="currentMovie.tagline" class="text-indigo-400 italic text-base font-medium mb-1">
                  "{{ currentMovie.tagline }}"
                </p>

                <!-- Title -->
                <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
                  {{ currentMovie.title }}
                </h1>

                <!-- Meta Badges (Rating, Release Date, Runtime) -->
                <div class="flex flex-wrap items-center gap-3 mb-6">
                  <!-- Rating Badge -->
                  <div class="flex items-center gap-1.5 bg-gray-900/90 backdrop-blur-md border border-gray-700/80 rounded-full px-3.5 py-1.5 text-sm font-bold">
                    <StarIcon class="size-4 text-yellow-400" />
                    <span :class="getRatingColor(currentMovie.vote_average)">
                      {{ currentMovie.vote_average.toFixed(1) }}
                    </span>
                  </div>

                  <!-- Release Date Badge -->
                  <div class="flex items-center gap-1.5 bg-gray-900/90 backdrop-blur-md border border-gray-700/80 rounded-full px-3.5 py-1.5 text-sm font-medium text-gray-300">
                    <CalendarIcon class="size-4 text-gray-400" />
                    <span>{{ formatDate(currentMovie.release_date) }}</span>
                  </div>

                  <!-- Runtime Badge -->
                  <div v-if="currentMovie.runtime" class="flex items-center gap-1.5 bg-gray-900/90 backdrop-blur-md border border-gray-700/80 rounded-full px-3.5 py-1.5 text-sm font-medium text-gray-300">
                    <ClockIcon class="size-4 text-gray-400" />
                    <span>{{ formatRuntime(currentMovie.runtime) }}</span>
                  </div>
                </div>

                <!-- Genre Pills -->
                <div v-if="currentMovie.genres && currentMovie.genres.length > 0" class="flex flex-wrap gap-2 mb-6">
                  <span
                    v-for="genre in currentMovie.genres"
                    :key="genre.id"
                    class="bg-indigo-950/70 text-indigo-300 border border-indigo-800/60 rounded-full px-3.5 py-1 text-xs font-semibold tracking-wide"
                  >
                    {{ genre.name }}
                  </span>
                </div>

                <!-- Overview Section -->
                <div class="mb-8">
                  <h2 class="text-lg font-bold text-white mb-2">Overview</h2>
                  <p class="text-gray-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                    {{ currentMovie.overview || 'No overview available for this movie.' }}
                  </p>
                </div>

                <!-- Action Button: Add to Favorites -->
                <div>
                  <button
                    @click="toggleFav"
                    :class="[
                      'inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl border font-medium text-sm transition-all duration-200 shadow-lg cursor-pointer',
                      isFav
                        ? 'bg-red-600 hover:bg-red-500 text-white border-red-500 shadow-red-950/50'
                        : 'bg-gray-900 hover:bg-indigo-600 text-white border-gray-700 hover:border-indigo-500 shadow-gray-950/50'
                    ]"
                  >
                    <HeartIconSolid v-if="isFav" class="size-4 text-white" />
                    <HeartIconOutline v-else class="size-4 text-gray-300" />
                    <span>{{ isFav ? 'Remove from Favorites' : 'Add to Favorites' }}</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>