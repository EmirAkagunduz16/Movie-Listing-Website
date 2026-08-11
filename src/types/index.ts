export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetail extends Movie {
  tagline?: string;
  runtime?: number;
  genres: Genre[];
  status?: string;
  budget?: number;
  revenue?: number;
  homepage?: string;
  imdb_id?: string;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type MovieCategory = 'popular' | 'top_rated' | 'upcoming' | 'now_playing';

export interface CategoryConfig {
  category: MovieCategory;
  title: string;
  subtitle: string;
  endpoint: string;
  path: string;
}
