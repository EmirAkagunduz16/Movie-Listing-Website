<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon, FilmIcon, HeartIcon, SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
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
  <Disclosure as="nav"
              class="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-gray-800 transition-colors duration-200"
              v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">

        <!-- Mobile menu button -->
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <DisclosureButton
                            class="inline-flex items-center justify-center rounded-md p-2 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open"
                       class="block size-6"
                       aria-hidden="true" />
            <XMarkIcon v-else
                       class="block size-6"
                       aria-hidden="true" />
          </DisclosureButton>
        </div>

        <!-- Logo + Nav Links -->
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <!-- Logo -->
          <RouterLink to="/"
                      class="flex shrink-0 items-center gap-2">
            <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600">
              <FilmIcon class="size-5 text-white"
                        aria-hidden="true" />
            </div>
            <span class="text-slate-900 dark:text-white font-bold text-lg tracking-tight">CineVault</span>
          </RouterLink>

          <!-- Nav Links -->
          <div class="hidden sm:ml-8 sm:flex sm:items-center sm:space-x-1">
            <RouterLink v-for="item in navigation"
                        :key="item.name"
                        :to="item.href"
                        :class="[
                          item.current
                            ? 'bg-indigo-600 text-white'
                            : 'text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800 hover:text-slate-900 dark:hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150'
                        ]"
                        :aria-current="item.current ? 'page' : undefined">
              {{ item.name }}
            </RouterLink>
          </div>
        </div>

        <!-- Right Side: Favorites Icon + Search -->
        <div class="absolute inset-y-0 right-0 flex items-center justify-between pr-2 sm:static sm:inset-auto  sm:pr-0">
          <!-- Dark Light Theme Button -->
          <button
            type="button"
            @click="toggleTheme"
            class="relative rounded-full p-2 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors mr-2 flex items-center justify-center cursor-pointer"
            :title="theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          >
            <SunIcon v-if="theme === 'dark'" class="size-5 text-amber-400" aria-hidden="true" />
            <MoonIcon v-else class="size-5 text-indigo-500" aria-hidden="true" />
          </button>

          <!-- Favorites Icon Button -->
          <RouterLink to="/favorites"
                      :class="[
                        'relative rounded-full p-2 transition-colors mr-2 flex items-center justify-center',
                        route.path === '/favorites'
                          ? 'text-red-500 bg-red-100 dark:bg-red-950/40 border border-red-300 dark:border-red-800/50'
                          : 'text-slate-500 dark:text-gray-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-gray-800'
                      ]"
                      title="Favorites">
            <HeartIcon class="size-5"
                       aria-hidden="true" />
            <span v-if="favoriteCount > 0"
                  class="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center border border-white dark:border-gray-900 shadow-md">
              {{ favoriteCount }}
            </span>
          </RouterLink>

          <!-- Search Bar & Toggle Button -->
          <form @submit.prevent="onSearchSubmit"
                class="relative flex items-center">
            <transition enter-active-class="transition ease-out duration-200"
                        enter-from-class="opacity-0 w-0"
                        enter-to-class="opacity-100 w-48 sm:w-64"
                        leave-active-class="transition ease-in duration-150"
                        leave-from-class="opacity-100 w-48 sm:w-64"
                        leave-to-class="opacity-0 w-0">
              <input v-if="showSearch"
                     v-model="searchQuery"
                     type="text"
                     placeholder="Search movies by title..."
                     class="mr-2 overflow-hidden bg-slate-100 dark:bg-gray-800 text-slate-900 dark:text-white text-sm rounded-lg px-3 py-1.5 border border-slate-300 dark:border-gray-700 focus:outline-none focus:border-indigo-500 placeholder-slate-400 dark:placeholder-gray-500 w-48 sm:w-64"
                     autofocus
                     @keydown.enter="onSearchSubmit" />
            </transition>
            <button type="button"
                    @click="toggleSearchInput"
                    class="rounded-full p-2 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
                    title="Search">
              <MagnifyingGlassIcon class="size-5"
                                   aria-hidden="true" />
            </button>
          </form>
        </div>

      </div>
    </div>

    <!-- Mobile Menu -->
    <DisclosurePanel class="sm:hidden border-t border-slate-200 dark:border-gray-800">
      <div class="space-y-1 px-3 pt-2 pb-3">
        <DisclosureButton v-for="item in navigation"
                          :key="item.name"
                          as="template">
          <RouterLink :to="item.href"
                      :class="[
                        item.current
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800 hover:text-slate-900 dark:hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium transition-colors'
                      ]"
                      :aria-current="item.current ? 'page' : undefined">
            {{ item.name }}
          </RouterLink>
        </DisclosureButton>

        <!-- Mobile Search Form -->
        <form @submit.prevent="onSearchSubmit"
              class="mt-2 px-1">
          <input v-model="searchQuery"
                 type="text"
                 placeholder="Search movies..."
                 class="w-full bg-slate-100 dark:bg-gray-800 text-slate-900 dark:text-white text-sm rounded-lg px-3 py-2 border border-slate-300 dark:border-gray-700 focus:outline-none focus:border-indigo-500 placeholder-slate-400 dark:placeholder-gray-500"
                 @keydown.enter="onSearchSubmit" />
        </form>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>