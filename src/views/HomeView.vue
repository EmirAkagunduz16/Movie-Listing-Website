<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import MovieCard from '@/components/MovieCard.vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'

// Mock film verisi (TMDB yapısına uygun)
const mockMovies = [
  {
    id: 1,
    title: 'Oppenheimer',
    poster_path: '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    release_date: '2023-07-19',
    vote_average: 8.2,
    overview: 'The story of J. Robert Oppenheimer\'s role in the development of the atomic bomb during World War II.'
  },
  {
    id: 2,
    title: 'Dune: Part Two',
    poster_path: '/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    release_date: '2024-03-01',
    vote_average: 8.5,
    overview: 'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.'
  },
  {
    id: 3,
    title: 'Poor Things',
    poster_path: '/kCGlIMHnOm8JPXIR2CExovgDNs3.jpg',
    release_date: '2023-12-08',
    vote_average: 7.8,
    overview: 'The incredible tale about the fantastical evolution of Bella Baxter, a young woman brought back to life by the brilliant and unorthodox scientist Dr. Godwin Baxter.'
  },
  {
    id: 4,
    title: 'The Zone of Interest',
    poster_path: '/hUu9zyZmKuXA4ceqHhtPBmpoaTR.jpg',
    release_date: '2023-12-15',
    vote_average: 7.4,
    overview: 'A Nazi officer and his wife build their dream life next to the walls of Auschwitz.'
  },
  {
    id: 5,
    title: 'Past Lives',
    poster_path: '/k3waqVXCBRSLQ5XHJT3ycCUJoN7.jpg',
    release_date: '2023-06-02',
    vote_average: 8.0,
    overview: 'Two childhood friends are separated when one of their families emigrates. Years later, they reunite in New York to reflect on their lives and the choices that shaped their paths.'
  },
  {
    id: 6,
    title: 'Maestro',
    poster_path: '/qH5RecTZnBRSYHYmQ8ygD5jQB1H.jpg',
    release_date: '2023-12-20',
    vote_average: 6.8,
    overview: 'A towering and fearless love story chronicling the lifelong relationship between Leonard Bernstein and Felicia Montealegre Cohn Bernstein.'
  },
  {
    id: 7,
    title: 'Killers of the Flower Moon',
    poster_path: '/dB6KgOAKMQNTm3JGFV6HuSi5SBp.jpg',
    release_date: '2023-10-20',
    vote_average: 7.6,
    overview: 'Members of the Osage tribe in the United States are murdered under mysterious circumstances in the 1920s, sparking a major FBI investigation.'
  },
  {
    id: 8,
    title: 'Saltburn',
    poster_path: '/qjhahNLSZ705B5JP92YMEYPocPz.jpg',
    release_date: '2023-11-22',
    vote_average: 7.1,
    overview: 'A student at Oxford University finds himself drawn into the world of a charming and aristocratic classmate, who invites him to his eccentric family\'s sprawling estate for a summer.'
  },
  {
    id: 9,
    title: 'American Fiction',
    poster_path: '/9ssEkeqQgEBcXfMF6DVf0sPi8yN.jpg',
    release_date: '2023-12-15',
    vote_average: 7.5,
    overview: 'A novelist who\'s fed up with the establishment profiting from Black entertainment uses a pen name to write a book that propels him to the heart of hypocrisy and self-discovery.'
  },
  {
    id: 10,
    title: 'The Holdovers',
    poster_path: '/VHmqX6MBpAr7n3hKhFBVlFXZQaF.jpg',
    release_date: '2023-11-10',
    vote_average: 7.9,
    overview: 'A curmudgeonly professor at a New England prep school is forced to remain on campus during winter break and he soon bonds with the school\'s head cook and a student who has nowhere to go.'
  },
  {
    id: 11,
    title: 'Society of the Snow',
    poster_path: '/2e853GW8yKzb26cJmf4GDqbw0OX.jpg',
    release_date: '2024-01-04',
    vote_average: 7.8,
    overview: 'On October 13, 1972, a plane carrying a Uruguayan rugby team crashes in the snow-covered Andes mountains.'
  },
  {
    id: 12,
    title: 'The Beekeeper',
    poster_path: '/A7EByudX0eOzlkQ2FIbogzyazm2.jpg',
    release_date: '2024-01-12',
    vote_average: 6.9,
    overview: 'One man\'s crusade for vengeance takes on national stakes after he is revealed to be a former operative of a powerful and clandestine organization known as Beekeepers.'
  },
]

const currentPage = ref(1)
const totalPages = ref(10)

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}

function goToPage(page: number) {
  currentPage.value = page
}

const visiblePages = [1, 2, 3, 4, 5]
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-white">
    <Navbar />

    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950 border-b border-gray-800">
      <div class="absolute inset-0 bg-[url('https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg')] bg-cover bg-center opacity-10"></div>
      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div class="max-w-2xl">
          <p class="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">Discover</p>
          <h1 class="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Popular Movies
          </h1>
          <p class="text-gray-400 text-lg leading-relaxed">
            Explore the most-watched films across the globe. Find your next favorite movie.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">

      <!-- Section Header -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-3">
          <div class="w-1 h-7 bg-indigo-500 rounded-full"></div>
          <h2 class="text-xl font-bold text-white">Popular Right Now</h2>
        </div>
        <span class="text-sm text-gray-500">{{ mockMovies.length }} films</span>
      </div>

      <!-- Movie Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        <MovieCard
          v-for="movie in mockMovies"
          :key="movie.id"
          :movie="movie"
        />
      </div>

      <!-- Pagination -->
      <div class="mt-12 flex items-center justify-center gap-2">
        <!-- Prev Button -->
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 text-sm font-medium border border-gray-700 hover:bg-gray-700 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
        >
          <ChevronLeftIcon class="size-4" />
          <span class="hidden sm:inline">Prev</span>
        </button>

        <!-- Page Numbers -->
        <div class="flex items-center gap-1">
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'w-9 h-9 rounded-lg text-sm font-semibold transition-all duration-150',
              currentPage === page
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50'
                : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700 hover:text-white'
            ]"
          >
            {{ page }}
          </button>
          <span class="text-gray-600 px-1">...</span>
          <button
            @click="goToPage(totalPages)"
            :class="[
              'w-9 h-9 rounded-lg text-sm font-semibold transition-all duration-150',
              currentPage === totalPages
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700 hover:text-white'
            ]"
          >
            {{ totalPages }}
          </button>
        </div>

        <!-- Next Button -->
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 text-sm font-medium border border-gray-700 hover:bg-gray-700 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
        >
          <span class="hidden sm:inline">Next</span>
          <ChevronRightIcon class="size-4" />
        </button>
      </div>

      <!-- Page info -->
      <p class="mt-4 text-center text-xs text-gray-600">
        Page {{ currentPage }} of {{ totalPages }}
      </p>

    </main>

    <!-- Footer -->
    <footer class="border-t border-gray-800 mt-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <div class="flex items-center justify-center w-6 h-6 rounded bg-indigo-600">
              <svg class="size-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
            </div>
            <span class="text-gray-400 text-sm font-medium">CineVault</span>
          </div>
          <p class="text-gray-600 text-xs">
            Powered by
            <a href="https://www.themoviedb.org/" target="_blank" class="text-indigo-500 hover:text-indigo-400 transition-colors">TMDB API</a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>