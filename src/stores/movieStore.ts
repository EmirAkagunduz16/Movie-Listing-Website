import { defineStore } from "pinia";
import { ref } from "vue";
import { getMoviesByCategory, getMovieDetails } from "@/service/tmdb";
import type { Movie, MovieDetail, MovieCategory } from "@/types";

export const useMovieStore = defineStore("movie", () => {
  // State
  const movies = ref<Movie[]>([]);
  const currentMovie = ref<MovieDetail | null>(null);
  const loading = ref(false);
  const movieLoading = ref(false);
  const error = ref<string | null>(null);
  const currentPage = ref(1);
  const totalPages = ref(1);
  const activeCategory = ref<MovieCategory>("popular");
  const favorites = ref<number[]>([]);

  // Actions
  async function fetchMovies(category: MovieCategory = "popular", page: number = 1) {
    loading.value = true;
    error.value = null;
    activeCategory.value = category;

    try {
      const data = await getMoviesByCategory(category, page);
      movies.value = data.results;
      currentPage.value = data.page;
      totalPages.value = Math.min(data.total_pages, 500);
    } catch (err: any) {
      error.value = err?.message || "Filmler yüklenirken bir hata oluştu.";
    } finally {
      loading.value = false;
    }
  }

  async function fetchMovieDetails(movieId: number | string) {
    movieLoading.value = true;
    error.value = null;
    currentMovie.value = null;

    try {
      const data = await getMovieDetails(movieId);
      currentMovie.value = data;
    } catch (err: any) {
      error.value = err?.message || "Movie details could not be loaded.";
    } finally {
      movieLoading.value = false;
    }
  }

  function toggleFavorite(id: number) {
    const index = favorites.value.indexOf(id);
    if (index > -1) {
      favorites.value.splice(index, 1);
    } else {
      favorites.value.push(id);
    }
  }

  function isFavorite(id: number): boolean {
    return favorites.value.includes(id);
  }

  return {
    movies,
    currentMovie,
    loading,
    movieLoading,
    error,
    currentPage,
    totalPages,
    activeCategory,
    favorites,
    fetchMovies,
    fetchMovieDetails,
    toggleFavorite,
    isFavorite,
  };
});
