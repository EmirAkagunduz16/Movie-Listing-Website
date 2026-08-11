<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon, FilmIcon } from '@heroicons/vue/24/outline'
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { MOVIE_CATEGORIES } from '@/constants/categories'

const route = useRoute()

// Dynamically generate navigation links from MOVIE_CATEGORIES constants
const navigation = computed(() =>
  Object.values(MOVIE_CATEGORIES).map((item) => ({
    name: item.title.replace(' Movies', ''),
    href: item.path,
    current: route.path === item.path,
  }))
)

const searchQuery = ref('')
const showSearch = ref(false)
</script>

<template>
  <Disclosure as="nav" class="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">

        <!-- Mobile menu button -->
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <DisclosureButton class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
            <XMarkIcon v-else class="block size-6" aria-hidden="true" />
          </DisclosureButton>
        </div>

        <!-- Logo + Nav Links -->
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <!-- Logo -->
          <RouterLink to="/" class="flex shrink-0 items-center gap-2">
            <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600">
              <FilmIcon class="size-5 text-white" aria-hidden="true" />
            </div>
            <span class="text-white font-bold text-lg tracking-tight">CineVault</span>
          </RouterLink>

          <!-- Nav Links -->
          <div class="hidden sm:ml-8 sm:flex sm:items-center sm:space-x-1">
            <RouterLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              :class="[
                item.current
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white',
                'rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150'
              ]"
              :aria-current="item.current ? 'page' : undefined"
            >
              {{ item.name }}
            </RouterLink>
          </div>
        </div>

        <!-- Search -->
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div class="relative flex items-center">
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 w-0"
              enter-to-class="opacity-100 w-48"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 w-48"
              leave-to-class="opacity-0 w-0"
            >
              <input
                v-if="showSearch"
                v-model="searchQuery"
                type="text"
                placeholder="Search movies..."
                class="mr-2 overflow-hidden bg-gray-800 text-white text-sm rounded-lg px-3 py-1.5 border border-gray-700 focus:outline-none focus:border-indigo-500 placeholder-gray-500 w-48"
                autofocus
              />
            </transition>
            <button
              @click="showSearch = !showSearch"
              class="rounded-full p-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <MagnifyingGlassIcon class="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- Mobile Menu -->
    <DisclosurePanel class="sm:hidden border-t border-gray-800">
      <div class="space-y-1 px-3 pt-2 pb-3">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="template"
        >
          <RouterLink
            :to="item.href"
            :class="[
              item.current
                ? 'bg-indigo-600 text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white',
              'block rounded-md px-3 py-2 text-base font-medium transition-colors'
            ]"
            :aria-current="item.current ? 'page' : undefined"
          >
            {{ item.name }}
          </RouterLink>
        </DisclosureButton>
        <!-- Mobile Search -->
        <div class="mt-2 px-1">
          <input
            type="text"
            placeholder="Search movies..."
            class="w-full bg-gray-800 text-white text-sm rounded-lg px-3 py-2 border border-gray-700 focus:outline-none focus:border-indigo-500 placeholder-gray-500"
          />
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>