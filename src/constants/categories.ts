import type { CategoryConfig, MovieCategory } from '@/types'

export const MOVIE_CATEGORIES: Record<MovieCategory, CategoryConfig> = {
  popular: {
    category: 'popular',
    title: 'Popular Movies',
    subtitle: 'Explore the most-watched films across the globe. Find your next favorite movie.',
    endpoint: '/movie/popular',
    path: '/',
  },
  top_rated: {
    category: 'top_rated',
    title: 'Top Rated Movies',
    subtitle: 'Discover the highest-rated films of all time according to cinema lovers worldwide.',
    endpoint: '/movie/top_rated',
    path: '/top-rated',
  },
  upcoming: {
    category: 'upcoming',
    title: 'Upcoming Movies',
    subtitle: 'Check out the most anticipated upcoming movies coming soon to theaters.',
    endpoint: '/movie/upcoming',
    path: '/upcoming',
  },
  now_playing: {
    category: 'now_playing',
    title: 'Now Playing',
    subtitle: 'Catch the latest movies currently playing in cinemas right now.',
    endpoint: '/movie/now_playing',
    path: '/now-playing',
  },
}
