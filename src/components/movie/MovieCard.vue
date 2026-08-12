<script setup lang="ts">
import { StarIcon, CalendarIcon, HeartIcon as HeartIconSolid } from '@heroicons/vue/24/solid'
import { HeartIcon as HeartIconOutline } from '@heroicons/vue/24/outline'
import type { Movie } from '@/types'
import { formatDate, getRatingColor, getTMDBImageUrl } from '@/utils/formatters'

const props = withDefaults(
  defineProps<{
    movie: Movie
    isFavorite?: boolean
  }>(),
  {
    isFavorite: false,
  }
)

const emit = defineEmits<{
  (e: 'toggle-favorite', movie: Movie): void
}>()

function toggleFav(event: Event) {
  event.preventDefault()
  event.stopPropagation()
  emit('toggle-favorite', props.movie)
}
</script>

<template>
  <RouterLink
    :to="{ name: 'movieDetail', params: { id: movie.id } }"
    class="movie-card group relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-slate-200 dark:border-gray-800 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-900/20 hover:-translate-y-1 block cursor-pointer"
  >
    <!-- Poster -->
    <div class="relative aspect-2/3 overflow-hidden bg-gray-100 dark:bg-gray-800">
      <img
        v-if="movie.poster_path"
        :src="getTMDBImageUrl(movie.poster_path)!"
        :alt="movie.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div v-else class="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <svg class="w-16 h-16 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
      </div>

      <!-- Favorite Button -->
      <button
        @click="toggleFav"
        type="button"
        :title="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
        :class="[
          'absolute top-2 left-2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md',
          isFavorite
            ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-900/50'
            : 'bg-gray-900/80 hover:bg-gray-900 text-gray-300 hover:text-white border border-gray-700/60 backdrop-blur-sm'
        ]"
      >
        <HeartIconSolid v-if="isFavorite" class="size-4 text-white" />
        <HeartIconOutline v-else class="size-4" />
      </button>

      <!-- Rating Badge -->
      <div class="absolute top-2 right-2 flex items-center gap-1 bg-gray-900/90 backdrop-blur-sm rounded-full px-2 py-1 border border-gray-700">
        <StarIcon class="size-3.5 text-yellow-400" />
        <span :class="['text-xs font-bold', getRatingColor(movie.vote_average)]">
          {{ movie.vote_average.toFixed(1) }}
        </span>
      </div>

      <!-- Hover Overlay -->
      <div class="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 pointer-events-none">
        <p class="text-gray-300 text-xs line-clamp-3 leading-relaxed">{{ movie.overview }}</p>
      </div>
    </div>

    <!-- Info -->
    <div class="p-3">
      <h3 class="text-slate-900 dark:text-white font-semibold text-sm leading-tight line-clamp-2 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
        {{ movie.title }}
      </h3>
      <div class="flex items-center gap-1 text-slate-500 dark:text-gray-500 text-xs">
        <CalendarIcon class="size-3.5 text-slate-400 dark:text-gray-600" />
        <span>{{ formatDate(movie.release_date) }}</span>
      </div>
    </div>
  </RouterLink>
</template>