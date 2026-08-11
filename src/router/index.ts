import { createRouter, createWebHistory } from 'vue-router'
import NotFoundView from '@/views/NotFoundView.vue'
import HomeView from '@/views/HomeView.vue'
import { MOVIE_CATEGORIES } from '@/constants/categories'

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
      path: '/:catchAll(.*)',
      component: NotFoundView,
    },
  ],
})

export default router
