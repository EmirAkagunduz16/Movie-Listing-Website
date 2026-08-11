import { createRouter, createWebHistory } from 'vue-router'
import { MOVIE_CATEGORIES } from '@/constants/categories'
import MovieDetailView from '@/views/MovieDetailView.vue'
import FavoritesView from '@/views/FavoritesView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import HomeView from '@/views/HomeView.vue'

// Generate route definitions dynamically from category constants
const categoryRoutes = Object.values(MOVIE_CATEGORIES).map((config) => ({
  path: config.path,
  name: config.category,
  component: HomeView,
  props: {
    category: config.category,
    title: config.title,
    subtitle: config.subtitle,
  },
}))

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...categoryRoutes,
    {
      path: '/movie/:id',
      name: 'movieDetail',
      component: MovieDetailView,
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesView,
    },
    {
      path: '/:catchAll(.*)',
      component: NotFoundView,
    },
  ],
})

export default router
