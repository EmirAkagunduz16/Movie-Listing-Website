<script setup lang="ts">
import { storeToRefs } from 'pinia'
import MovieListLayout from '@/components/layout/MovieListLayout.vue'
import EmptyState from '@/components/shared/EmptyState.vue'
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
      <EmptyState
        icon="bi-heart"
        icon-color-class="text-danger"
        title="No Favorite Movies Yet"
        description="You haven't saved any movies to your favorites. Explore popular movies and click &quot;Add to Favorites&quot; on any movie page!"
        action-text="Explore Movies"
        action-to="/"
        action-icon="bi-film"
      />
    </template>
  </MovieListLayout>
</template>
