import { defineStore } from "pinia";
import { ref } from "vue";
import { getMoviesByCategory } from "@/service/tmdb";
import type { Movie, MovieCategory } from "@/types";

export const useMovieStore = defineStore("movie", () => {
  // State
  const movies = ref<Movie[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const currentPage = ref(1);
  const totalPages = ref(1);
  const activeCategory = ref<MovieCategory>("popular");

  // Fetch movies for any specified category
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

  return {
    movies,
    loading,
    error,
    currentPage,
    totalPages,
    activeCategory,
    fetchMovies,
  };
});
