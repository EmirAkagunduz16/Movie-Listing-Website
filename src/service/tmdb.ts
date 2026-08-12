import type { Movie, MovieDetail, TMDBResponse, MovieCategory } from "@/types";
import { MOVIE_CATEGORIES } from "@/constants/categories";
import { axiosClient } from "./api";

export async function getMoviesByCategory(
  category: MovieCategory = "popular",
  page: number = 1,
): Promise<TMDBResponse<Movie>> {
  const config = MOVIE_CATEGORIES[category] || MOVIE_CATEGORIES.popular;
  const response = await axiosClient.get<TMDBResponse<Movie>>(config.endpoint, {
    params: {
      page,
      language: "en-US",
      region: "US",
    },
  });

  return response.data;
}

export async function getMovieDetails(
  movieId: number | string,
): Promise<MovieDetail> {
  const response = await axiosClient.get<MovieDetail>(`/movie/${movieId}`, {
    params: {
      language: "en-US",
    },
  });

  return response.data;
}

/**
 * Searches movies by title keyword query from TMDB API.
 * @param query - Search keyword
 * @param page - Page number (defaults to 1)
 */
export async function searchMovies(
  query: string,
  page: number = 1,
): Promise<TMDBResponse<Movie>> {
  const response = await axiosClient.get<TMDBResponse<Movie>>("/search/movie", {
    params: {
      query,
      page,
      language: "en-US",
    },
  });

  return response.data;
}
