<script setup lang="ts">
import Navbar from '@/components/layout/Navbar.vue'
import HeroSection from '@/components/shared/HeroSection.vue'
import MovieCard from '@/components/movie/MovieCard.vue'
import SkeletonLoader from '@/components/shared/SkeletonLoader.vue'
import ErrorMessage from '@/components/shared/ErrorMessage.vue'
import Pagination from '@/components/shared/Pagination.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import type { Movie } from '@/types'

defineProps<{
  /** Hero section title */
  heroTitle: string
  /** Hero section subtitle */
  heroSubtitle: string
  /** Section header title (below hero) */
  sectionTitle: string
  /** Right-side info text (e.g. "20 films on page") */
  sectionInfo?: string
  /** Accent color for the section header bar */
  accentColor?: string
  /** Movie list to render */
  movies: Movie[]
  /** Whether data is currently loading */
  loading: boolean
  /** Error message, if any */
  error: string | null
  /** Current page (for pagination) */
  currentPage?: number
  /** Total pages (for pagination) */
  totalPages?: number
  /** Function to check if a movie is favorite */
  isFavoriteFn?: (id: number) => boolean
}>()

defineEmits<{
  (e: 'retry'): void
  (e: 'page-change', page: number): void
  (e: 'toggle-favorite', movie: Movie): void
}>()
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <div class="flex-grow-1">
      <Navbar />
      <HeroSection :title="heroTitle" :subtitle="heroSubtitle" />

      <main class="container py-4 py-md-5">
        <!-- Section Header -->
        <div class="d-flex align-items-center justify-content-between mb-4">
          <div class="d-flex align-items-center gap-2">
            <div
              class="rounded-pill"
              style="width: 4px; height: 28px;"
              :style="{ backgroundColor: accentColor || '#6366f1' }"
            ></div>
            <h2 class="fs-5 fw-bold mb-0">{{ sectionTitle }}</h2>
          </div>
          <span v-if="sectionInfo && !loading" class="text-body-secondary small">
            {{ sectionInfo }}
          </span>
        </div>

        <!-- Loading State -->
        <SkeletonLoader v-if="loading" :count="12" />

        <!-- Error State -->
        <ErrorMessage
          v-else-if="error"
          :message="error"
          @retry="$emit('retry')"
        />

        <!-- Empty State Slot — used by pages that need a custom empty view -->
        <template v-else-if="movies.length === 0">
          <slot name="empty" />
        </template>

        <!-- Movie Grid -->
        <template v-else>
          <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 g-3">
            <div v-for="movie in movies" :key="movie.id" class="col">
              <MovieCard
                :movie="movie"
                :is-favorite="isFavoriteFn ? isFavoriteFn(movie.id) : false"
                @toggle-favorite="$emit('toggle-favorite', $event)"
              />
            </div>
          </div>

          <!-- Pagination -->
          <Pagination
            v-if="totalPages && totalPages > 1 && currentPage"
            :current-page="currentPage"
            :total-pages="totalPages"
            @page-change="$emit('page-change', $event)"
          />
        </template>
      </main>
    </div>

    <AppFooter />
  </div>
</template>
