<script setup lang="ts">
import { storeToRefs } from 'pinia'
import MovieListLayout from '@/components/layout/MovieListLayout.vue'
import { useMovieStore } from '@/stores/movieStore'

const movieStore = useMovieStore()
const { favoriteMovies } = storeToRefs(movieStore)
</script>

<template>
  <MovieListLayout
    hero-title="Favorite Movies"
    hero-subtitle="Your personal collection of saved films. Easily access your top picks anytime."
    section-title="Your Saved Collection"
    :section-info="`${favoriteMovies.length} saved films`"
    accent-color="#ef4444"
    :movies="favoriteMovies"
    :loading="false"
    :error="null"
    :is-favorite-fn="movieStore.isFavorite"
    @toggle-favorite="movieStore.toggleFavorite"
  >
    <!-- Custom Empty State for Favorites -->
    <template #empty>
      <div class="card border rounded-3 text-center py-5 px-4">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-center rounded-3 bg-body-secondary mx-auto mb-3" style="width: 64px; height: 64px;">
            <i class="bi bi-heart text-danger fs-3"></i>
          </div>
          <h3 class="fs-5 fw-bold mb-2">No Favorite Movies Yet</h3>
          <p class="text-body-secondary small mb-4 mx-auto" style="max-width: 400px;">
            You haven't saved any movies to your favorites. Explore popular movies and click "Add to Favorites" on any movie page!
          </p>
          <RouterLink
            to="/"
            class="btn btn-indigo d-inline-flex align-items-center gap-2"
          >
            <i class="bi bi-film"></i>
            <span>Explore Movies</span>
          </RouterLink>
        </div>
      </div>
    </template>
  </MovieListLayout>
</template>
