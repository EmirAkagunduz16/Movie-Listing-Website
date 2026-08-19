<script setup lang="ts">
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
    class="movie-card card h-100 border rounded-3 overflow-hidden text-decoration-none"
  >
    <!-- Poster -->
    <div class="poster-wrapper position-relative overflow-hidden bg-body-secondary">
      <img
        v-if="movie.poster_path"
        :src="getTMDBImageUrl(movie.poster_path)!"
        :alt="movie.title"
        class="card-img-top w-100 h-100 object-fit-cover"
      />
      <div v-else class="w-100 h-100 d-flex align-items-center justify-content-center bg-body-secondary">
        <i class="bi bi-film text-body-tertiary" style="font-size: 3rem;"></i>
      </div>

      <!-- Favorite Button -->
      <button
        @click="toggleFav"
        type="button"
        :title="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
        class="btn btn-sm position-absolute top-0 start-0 m-2 rounded-circle d-flex align-items-center justify-content-center shadow"
        :class="isFavorite
          ? 'btn-danger'
          : 'btn-dark bg-opacity-75'"
        style="width: 30px; height: 30px; z-index: 2;"
      >
        <i class="bi" :class="isFavorite ? 'bi-heart-fill' : 'bi-heart'" style="font-size: 0.75rem;"></i>
      </button>

      <!-- Rating Badge -->
      <div class="position-absolute top-0 end-0 m-2 d-flex align-items-center gap-1 bg-dark bg-opacity-75 rounded-pill px-2 py-1 border border-secondary-subtle" style="z-index: 2;">
        <i class="bi bi-star-fill text-warning" style="font-size: 0.7rem;"></i>
        <span :class="['small fw-bold', getRatingColor(movie.vote_average)]">
          {{ (movie.vote_average ?? 0).toFixed(1) }}
        </span>
      </div>

      <!-- Hover Overlay -->
      <div class="card-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end p-3" style="background: linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.3), transparent); pointer-events: none;">
        <p class="text-white-60 small mb-0 line-clamp-3 lh-sm">{{ movie.overview }}</p>
      </div>
    </div>

    <!-- Info -->
    <div class="card-body p-2 p-sm-3">
      <h5 class="card-title small fw-semibold mb-2 line-clamp-2 lh-sm">
        {{ movie.title }}
      </h5>
      <div class="d-flex align-items-center gap-1 text-body-secondary" style="font-size: 0.75rem;">
        <i class="bi bi-calendar3"></i>
        <span>{{ formatDate(movie.release_date) }}</span>
      </div>
    </div>
  </RouterLink>
</template>