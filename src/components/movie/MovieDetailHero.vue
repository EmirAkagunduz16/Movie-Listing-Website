<script setup lang="ts">
import type { MovieDetail } from '@/types'
import { formatDate, formatRuntime, getRatingColor, getTMDBImageUrl } from '@/utils/formatters'

defineProps<{
  movie: MovieDetail
  isFavorite: boolean
}>()

defineEmits<{
  (e: 'back'): void
  (e: 'toggle-favorite'): void
}>()
</script>

<template>
  <div class="detail-hero-section position-relative overflow-hidden">
    <!-- Backdrop Image -->
    <div
      v-if="movie.backdrop_path"
      class="detail-backdrop"
      :style="{ backgroundImage: `url(${getTMDBImageUrl(movie.backdrop_path, 'original')})` }"
    ></div>
    <div class="detail-gradient"></div>

    <!-- Main Content Container -->
    <div class="position-relative container py-4 py-md-5" style="z-index: 2;">
      <!-- Back Button -->
      <button
        @click="$emit('back')"
        class="btn btn-sm btn-outline-light d-inline-flex align-items-center gap-2 mb-4"
        style="background-color: rgba(255, 255, 255, 0.1); border-color: rgba(255, 255, 255, 0.2);"
      >
        <i class="bi bi-arrow-left"></i>
        <span>Back to Movies</span>
      </button>

      <div class="row g-4 g-lg-5 align-items-center align-items-md-start">
        <!-- Movie Poster -->
        <div class="col-8 col-sm-6 col-md-4 mx-auto mx-md-0">
          <div class="rounded-3 overflow-hidden shadow-lg border border-secondary-subtle">
            <img
              v-if="movie.poster_path"
              :src="getTMDBImageUrl(movie.poster_path, 'w500')!"
              :alt="movie.title"
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
          <p v-if="movie.tagline" class="fst-italic fw-medium mb-1" style="color: #a5b4fc;">
            "{{ movie.tagline }}"
          </p>

          <!-- Title -->
          <h1 class="display-6 fw-bold text-white mb-3 lh-sm">
            {{ movie.title }}
          </h1>

          <!-- Meta Badges (Rating, Release Date, Runtime) -->
          <div class="d-flex flex-wrap align-items-center gap-2 mb-3">
            <!-- Rating Badge -->
            <span
              class="badge rounded-pill d-inline-flex align-items-center gap-1.5 px-3 py-2 fs-6 text-white"
              style="background-color: rgba(255, 255, 255, 0.12); border: 1px solid rgba(255, 255, 255, 0.18);"
            >
              <i class="bi bi-star-fill text-warning"></i>
              <span :class="getRatingColor(movie.vote_average)" class="fw-bold">
                {{ (movie.vote_average ?? 0).toFixed(1) }}
              </span>
            </span>

            <!-- Release Date Badge -->
            <span
              class="badge rounded-pill d-inline-flex align-items-center gap-1.5 px-3 py-2 fs-6 text-white"
              style="background-color: rgba(255, 255, 255, 0.12); border: 1px solid rgba(255, 255, 255, 0.18);"
            >
              <i class="bi bi-calendar3 opacity-75"></i>
              <span>{{ formatDate(movie.release_date) }}</span>
            </span>

            <!-- Runtime Badge -->
            <span
              v-if="movie.runtime"
              class="badge rounded-pill d-inline-flex align-items-center gap-1.5 px-3 py-2 fs-6 text-white"
              style="background-color: rgba(255, 255, 255, 0.12); border: 1px solid rgba(255, 255, 255, 0.18);"
            >
              <i class="bi bi-clock opacity-75"></i>
              <span>{{ formatRuntime(movie.runtime) }}</span>
            </span>
          </div>

          <!-- Genre Pills -->
          <div v-if="movie.genres && movie.genres.length > 0" class="d-flex flex-wrap gap-2 mb-3">
            <span
              v-for="genre in movie.genres"
              :key="genre.id"
              class="badge rounded-pill genre-pill px-3 py-2 fw-semibold"
            >
              {{ genre.name }}
            </span>
          </div>

          <!-- Overview Section -->
          <div class="mb-4">
            <h2 class="fs-5 fw-bold text-white mb-2">Overview</h2>
            <p class="lh-lg mb-0" style="color: #cbd5e1; max-width: 720px;">
              {{ movie.overview || 'No overview available for this movie.' }}
            </p>
          </div>

          <!-- Action Button: Add to Favorites -->
          <div>
            <button
              @click="$emit('toggle-favorite')"
              class="btn d-inline-flex align-items-center gap-2 px-4 py-2.5 rounded-3 fw-semibold shadow-sm"
              :class="isFavorite ? 'btn-danger' : 'btn-indigo'"
            >
              <i class="bi" :class="isFavorite ? 'bi-heart-fill' : 'bi-heart'"></i>
              <span>{{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
