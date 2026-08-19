<script setup lang="ts">
import { watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import Navbar from '@/components/layout/Navbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import MovieCard from '@/components/movie/MovieCard.vue'
import { useMovieStore } from '@/stores/movieStore'
import { formatDate, formatRuntime, getRatingColor, getTMDBImageUrl } from '@/utils/formatters'

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

// Go back to exactly where the user came from (preserves category, page, search query etc.)
// Falls back to '/' if there's no previous history entry (e.g. direct URL access)
function goBack() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <div class="flex-grow-1">
      <Navbar />

      <!-- Loading State -->
      <div v-if="movieLoading" class="container py-5">
        <div class="row g-4 align-items-start">
          <div class="col-12 col-md-4">
            <div class="poster-wrapper bg-body-secondary rounded-3 skeleton-pulse"></div>
          </div>
          <div class="col-12 col-md-8">
            <div class="placeholder-glow">
              <span class="placeholder col-3 rounded mb-3 d-block"></span>
              <span class="placeholder col-8 rounded mb-3 d-block" style="height: 2.5rem;"></span>
              <div class="d-flex gap-2 mb-3">
                <span class="placeholder rounded-pill" style="width: 80px; height: 32px;"></span>
                <span class="placeholder rounded-pill" style="width: 110px; height: 32px;"></span>
                <span class="placeholder rounded-pill" style="width: 90px; height: 32px;"></span>
              </div>
              <span class="placeholder col-12 rounded" style="height: 80px;"></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="container py-5">
        <div class="text-center py-5">
          <p class="text-danger fs-5 mb-4">{{ error }}</p>
          <button
            @click="movieStore.fetchMovieDetails(movieId)"
            class="btn btn-indigo d-inline-flex align-items-center gap-2"
          >
            <i class="bi bi-arrow-clockwise"></i>
            <span>Retry Loading</span>
          </button>
        </div>
      </div>

      <!-- Movie Details Content -->
      <div v-else-if="currentMovie" class="position-relative">
        <!-- Backdrop Banner with Overlay -->
        <div class="position-relative overflow-hidden" style="min-height: 70vh;">
          <!-- Backdrop Image -->
          <div
            v-if="currentMovie.backdrop_path"
            class="detail-backdrop"
            :style="{ backgroundImage: `url(${getTMDBImageUrl(currentMovie.backdrop_path, 'original')})` }"
          ></div>
          <div class="detail-gradient"></div>

          <!-- Main Content Container -->
          <div class="position-relative container py-4 py-md-5" style="z-index: 2;">
            <!-- Back Button -->
            <button
              @click="goBack"
              class="btn btn-sm btn-outline-light d-inline-flex align-items-center gap-2 mb-4 opacity-75"
            >
              <i class="bi bi-arrow-left"></i>
              <span>Back to Movies</span>
            </button>

            <div class="row g-4 g-lg-5 align-items-center align-items-md-start">
              <!-- Movie Poster -->
              <div class="col-8 col-sm-6 col-md-4 mx-auto mx-md-0">
                <div class="rounded-3 overflow-hidden shadow-lg border border-secondary-subtle">
                  <img
                    v-if="currentMovie.poster_path"
                    :src="getTMDBImageUrl(currentMovie.poster_path, 'w500')!"
                    :alt="currentMovie.title"
                    class="img-fluid w-100"
                  />
                  <div v-else class="poster-wrapper d-flex align-items-center justify-content-center bg-body-secondary">
                    <i class="bi bi-film text-body-tertiary" style="font-size: 4rem;"></i>
                  </div>
                </div>
              </div>

              <!-- Movie Details Info -->
              <div class="col-12 col-md-8">
                <!-- Tagline -->
                <p v-if="currentMovie.tagline" class="text-indigo fst-italic fw-medium mb-1">
                  "{{ currentMovie.tagline }}"
                </p>

                <!-- Title -->
                <h1 class="display-6 fw-bold text-white mb-3 lh-sm">
                  {{ currentMovie.title }}
                </h1>

                <!-- Meta Badges (Rating, Release Date, Runtime) -->
                <div class="d-flex flex-wrap align-items-center gap-2 mb-3">
                  <!-- Rating Badge -->
                  <span class="badge bg-dark bg-opacity-75 border border-secondary-subtle rounded-pill d-inline-flex align-items-center gap-1 px-3 py-2 fs-6">
                    <i class="bi bi-star-fill text-warning"></i>
                    <span :class="getRatingColor(currentMovie.vote_average)" class="fw-bold">
                      {{ currentMovie.vote_average.toFixed(1) }}
                    </span>
                  </span>

                  <!-- Release Date Badge -->
                  <span class="badge bg-dark bg-opacity-75 border border-secondary-subtle rounded-pill d-inline-flex align-items-center gap-1 px-3 py-2 fw-medium text-body-secondary">
                    <i class="bi bi-calendar3"></i>
                    {{ formatDate(currentMovie.release_date) }}
                  </span>

                  <!-- Runtime Badge -->
                  <span
                    v-if="currentMovie.runtime"
                    class="badge bg-dark bg-opacity-75 border border-secondary-subtle rounded-pill d-inline-flex align-items-center gap-1 px-3 py-2 fw-medium text-body-secondary"
                  >
                    <i class="bi bi-clock"></i>
                    {{ formatRuntime(currentMovie.runtime) }}
                  </span>
                </div>

                <!-- Genre Pills -->
                <div v-if="currentMovie.genres && currentMovie.genres.length > 0" class="d-flex flex-wrap gap-2 mb-3">
                  <span
                    v-for="genre in currentMovie.genres"
                    :key="genre.id"
                    class="badge rounded-pill bg-indigo bg-opacity-25 text-indigo border border-indigo px-3 py-2 small fw-semibold"
                    style="--bs-bg-opacity: 0.15; border-color: rgba(99, 102, 241, 0.4) !important;"
                  >
                    {{ genre.name }}
                  </span>
                </div>

                <!-- Overview Section -->
                <div class="mb-4">
                  <h2 class="fs-5 fw-bold text-white mb-2">Overview</h2>
                  <p class="text-white-50 lh-lg" style="max-width: 720px;">
                    {{ currentMovie.overview || 'No overview available for this movie.' }}
                  </p>
                </div>

                <!-- Action Button: Add to Favorites -->
                <div>
                  <button
                    @click="toggleFav"
                    class="btn d-inline-flex align-items-center gap-2 shadow"
                    :class="isFav
                      ? 'btn-danger'
                      : 'btn-outline-light'"
                  >
                    <i class="bi" :class="isFav ? 'bi-heart-fill' : 'bi-heart'"></i>
                    <span>{{ isFav ? 'Remove from Favorites' : 'Add to Favorites' }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Similar Movies Section -->
        <div
          v-if="similarMovies && similarMovies.length > 0"
          class="container py-4 py-md-5 border-top border-secondary-subtle"
        >
          <div class="d-flex align-items-center gap-2 mb-4">
            <div class="rounded-pill bg-indigo" style="width: 4px; height: 28px;"></div>
            <h2 class="fs-5 fw-bold mb-0">Similar Movies</h2>
          </div>

          <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 g-3">
            <div v-for="movie in similarMovies" :key="movie.id" class="col">
              <MovieCard
                :movie="movie"
                :is-favorite="movieStore.isFavorite(movie.id)"
                @toggle-favorite="movieStore.toggleFavorite"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>