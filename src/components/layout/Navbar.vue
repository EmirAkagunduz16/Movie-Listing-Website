<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { MOVIE_CATEGORIES } from '@/constants/categories'
import { useMovieStore } from '@/stores/movieStore'
import { useTheme } from '@/composables/useTheme'
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()
const movieStore = useMovieStore()
const { favoriteCount } = storeToRefs(movieStore)
const { theme, toggleTheme } = useTheme()

// Dynamically generate navigation links from MOVIE_CATEGORIES constants
const navigation = computed(() =>
  Object.values(MOVIE_CATEGORIES).map((item) => ({
    name: item.title.replace(' Movies', ''),
    href: item.path,
    current: route.path === item.path,
  }))
)

const searchQuery = ref((route.query.q as string) || '')
const showSearch = ref(Boolean(route.query.q))

watch(
  () => route.query.q,
  (newQ) => {
    if (typeof newQ === 'string') {
      searchQuery.value = newQ
      showSearch.value = true
    }
  }
)

function onSearchSubmit() {
  const query = searchQuery.value.trim()
  if (query) {
    router.push({
      path: '/search',
      query: { q: query },
    })
  }
}

function toggleSearchInput() {
  showSearch.value = !showSearch.value
  if (!showSearch.value && route.path === '/search') {
    searchQuery.value = ''
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-md sticky-top border-bottom">
    <div class="container">
      <!-- Brand / Logo -->
      <RouterLink to="/" class="navbar-brand d-flex align-items-center gap-2 fw-bold">
        <div class="d-flex align-items-center justify-content-center rounded bg-indigo" style="width: 32px; height: 32px;">
          <i class="bi bi-film text-white"></i>
        </div>
        <span>CineVault</span>
      </RouterLink>

      <!-- Mobile Toggler -->
      <button
        class="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarMain"
        aria-controls="navbarMain"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Collapsible Content -->
      <div class="collapse navbar-collapse" id="navbarMain">
        <!-- Nav Links -->
        <ul class="navbar-nav me-auto mb-2 mb-md-0 ms-md-3">
          <li v-for="item in navigation" :key="item.name" class="nav-item">
            <RouterLink
              :to="item.href"
              class="nav-link rounded px-3 py-2"
              :class="{
                'active fw-semibold text-white bg-indigo': item.current,
              }"
              :aria-current="item.current ? 'page' : undefined"
            >
              {{ item.name }}
            </RouterLink>
          </li>
        </ul>

        <!-- Right Side: Theme + Favorites + Search -->
        <div class="d-flex align-items-center gap-2 mt-2 mt-md-0">
          <!-- Theme Toggle -->
          <button
            type="button"
            class="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
            style="width: 36px; height: 36px;"
            @click="toggleTheme"
            :title="theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          >
            <i v-if="theme === 'dark'" class="bi bi-sun-fill text-warning"></i>
            <i v-else class="bi bi-moon-fill text-indigo"></i>
          </button>

          <!-- Favorites -->
          <RouterLink
            to="/favorites"
            class="btn btn-sm rounded-circle d-flex align-items-center justify-content-center position-relative"
            :class="route.path === '/favorites'
              ? 'btn-outline-danger'
              : 'btn-outline-secondary'"
            style="width: 36px; height: 36px;"
            title="Favorites"
          >
            <i class="bi bi-heart-fill"></i>
            <span
              v-if="favoriteCount > 0"
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style="font-size: 0.6rem;"
            >
              {{ favoriteCount }}
            </span>
          </RouterLink>

          <!-- Search Form -->
          <form @submit.prevent="onSearchSubmit" class="d-flex align-items-center gap-2">
            <div v-if="showSearch" class="input-group input-group-sm" style="min-width: 180px;">
              <input
                v-model="searchQuery"
                type="text"
                class="form-control"
                placeholder="Search movies..."
                autofocus
                @keydown.enter="onSearchSubmit"
              />
            </div>
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
              style="width: 36px; height: 36px;"
              @click="toggleSearchInput"
              title="Search"
            >
              <i class="bi bi-search"></i>
            </button>
          </form>
        </div>

        <!-- Mobile Search (inside collapse) -->
        <form @submit.prevent="onSearchSubmit" class="d-md-none mt-3">
          <input
            v-model="searchQuery"
            type="text"
            class="form-control"
            placeholder="Search movies..."
            @keydown.enter="onSearchSubmit"
          />
        </form>
      </div>
    </div>
  </nav>
</template>