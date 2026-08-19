<script setup lang="ts">
import { watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import Navbar from '@/components/layout/Navbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import SkeletonLoader from '@/components/shared/SkeletonLoader.vue'
import ErrorMessage from '@/components/shared/ErrorMessage.vue'
import MovieDetailHero from '@/components/movie/MovieDetailHero.vue'
import MovieDetailSimilar from '@/components/movie/MovieDetailSimilar.vue'
import { useMovieStore } from '@/stores/movieStore'

const route = useRoute()
const router = useRouter()
const movieStore = useMovieStore()
const { currentMovie, movieLoading, error, similarMovies } = storeToRefs(movieStore)

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
    movieStore.toggleFavorite(currentMovie.value)
  }
}

function goBack() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}

function onRetry() {
  if (movieId.value) {
    movieStore.fetchMovieDetails(movieId.value)
  }
}
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <div class="flex-grow-1">
      <Navbar />

      <!-- Loading State -->
      <SkeletonLoader v-if="movieLoading" type="detail" />

      <!-- Error State -->
      <div v-else-if="error" class="container py-5">
        <ErrorMessage :message="error" @retry="onRetry" />
      </div>

      <!-- Movie Details Content -->
      <div v-else-if="currentMovie" class="position-relative">
        <MovieDetailHero
          :movie="currentMovie"
          :is-favorite="isFav"
          @back="goBack"
          @toggle-favorite="toggleFav"
        />

        <MovieDetailSimilar
          :movies="similarMovies"
          :is-favorite-fn="movieStore.isFavorite"
          @toggle-favorite="movieStore.toggleFavorite"
        />
      </div>
    </div>

    <AppFooter />
  </div>
</template>