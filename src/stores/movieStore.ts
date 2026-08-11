import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getMoviesByCategory, getMovieDetails, searchMovies } from "@/service/tmdb";
import { getFavoriteMoviesFromStorage, saveFavoriteMoviesToStorage } from "@/utils/storage";
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

  // Search State
  const searchResults = ref<Movie[]>([]);
  const searchQuery = ref("");
  const searchLoading = ref(false);
  const searchCurrentPage = ref(1);
  const searchTotalPages = ref(1);
  const searchTotalResults = ref(0);

  // Favorite Movies persisted in LocalStorage
  const favoriteMovies = ref<Movie[]>(getFavoriteMoviesFromStorage());

  const favoriteCount = computed(() => favoriteMovies.value.length);

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

  async function performSearch(query: string, page: number = 1) {
    if (!query.trim()) {
      searchResults.value = [];
      searchTotalResults.value = 0;
      return;
    }

    searchLoading.value = true;
    error.value = null;
    searchQuery.value = query;

    try {
      const data = await searchMovies(query, page);
      searchResults.value = data.results;
      searchCurrentPage.value = data.page;
      searchTotalPages.value = Math.min(data.total_pages, 500);
      searchTotalResults.value = data.total_results;
    } catch (err: any) {
      error.value = err?.message || "Search failed. Please try again.";
    } finally {
      searchLoading.value = false;
    }
  }

  function toggleFavorite(movie: Movie) {
    const index = favoriteMovies.value.findIndex((m) => m.id === movie.id);
    if (index > -1) {
      favoriteMovies.value.splice(index, 1);
    } else {
      favoriteMovies.value.push(movie);
    }
    saveFavoriteMoviesToStorage(favoriteMovies.value);
  }

  function isFavorite(id: number): boolean {
    return favoriteMovies.value.some((m) => m.id === id);
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
    searchResults,
    searchQuery,
    searchLoading,
    searchCurrentPage,
    searchTotalPages,
    searchTotalResults,
    favoriteMovies,
    favoriteCount,
    fetchMovies,
    fetchMovieDetails,
    performSearch,
    toggleFavorite,
    isFavorite,
  };
});
