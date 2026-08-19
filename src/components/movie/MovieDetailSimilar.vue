<script setup lang="ts">
import MovieCard from '@/components/movie/MovieCard.vue'
import type { Movie } from '@/types'

defineProps<{
  movies: Movie[]
  isFavoriteFn: (id: number) => boolean
}>()

defineEmits<{
  (e: 'toggle-favorite', movie: Movie): void
}>()
</script>

<template>
  <div
    v-if="movies && movies.length > 0"
    class="container py-4 py-md-5 border-top border-secondary-subtle"
  >
    <div class="d-flex align-items-center gap-2 mb-4">
      <div class="rounded-pill bg-indigo" style="width: 4px; height: 28px;"></div>
      <h2 class="fs-5 fw-bold mb-0">Similar Movies</h2>
    </div>

    <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 g-3">
      <div v-for="movie in movies" :key="movie.id" class="col">
        <MovieCard
          :movie="movie"
          :is-favorite="isFavoriteFn(movie.id)"
          @toggle-favorite="$emit('toggle-favorite', $event)"
        />
      </div>
    </div>
  </div>
</template>
