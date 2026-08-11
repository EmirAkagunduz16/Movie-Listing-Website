import type { Movie } from "@/types";

const FAVORITES_KEY = "cinevault_favorites";

export function getFavoriteMoviesFromStorage(): Movie[] {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    if (!data) return [];
    return JSON.parse(data) as Movie[];
  } catch (error) {
    console.error("Failed to read favorites from localStorage:", error);
    return [];
  }
}

export function saveFavoriteMoviesToStorage(favorites: Movie[]): void {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error("Failed to save favorites to localStorage:", error);
  }
}
