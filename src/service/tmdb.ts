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

// Convenience helper aliases
export const getPopularMovies = (page = 1) =>
  getMoviesByCategory("popular", page);
export const getTopRatedMovies = (page = 1) =>
  getMoviesByCategory("top_rated", page);
export const getUpcomingMovies = (page = 1) =>
  getMoviesByCategory("upcoming", page);
export const getNowPlayingMovies = (page = 1) =>
  getMoviesByCategory("now_playing", page);
