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
  <div class="min-h-screen bg-slate-50 text-slate-900 dark:bg-gray-950 dark:text-white flex flex-col justify-between transition-colors duration-200">
    <div>
      <Navbar />
      <HeroSection :title="heroTitle" :subtitle="heroSubtitle" />

      <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <!-- Section Header -->
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-3">
            <div
              class="w-1 h-7 rounded-full"
              :style="{ backgroundColor: accentColor || '#6366f1' }"
            ></div>
            <h2 class="text-xl font-bold text-slate-900 dark:text-white">{{ sectionTitle }}</h2>
          </div>
          <span v-if="sectionInfo && !loading" class="text-sm text-slate-500 dark:text-gray-500">
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
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            <MovieCard
              v-for="movie in movies"
              :key="movie.id"
              :movie="movie"
              :is-favorite="isFavoriteFn ? isFavoriteFn(movie.id) : false"
              @toggle-favorite="$emit('toggle-favorite', $event)"
            />
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
