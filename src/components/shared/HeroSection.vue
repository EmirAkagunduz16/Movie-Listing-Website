<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
}>()
</script>

<template>
  <section class="relative overflow-hidden bg-linear-to-b from-gray-900 to-gray-950 border-b border-gray-800">
    <div class="absolute inset-0 bg-[url('https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg')] bg-cover bg-center opacity-10"></div>
    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div class="max-w-2xl">
        <p class="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">Discover</p>
        <h1 class="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
          {{ title }}
        </h1>
        <p class="text-gray-400 text-lg leading-relaxed">
          {{ subtitle }}
        </p>
      </div>
    </div>
  </section>
</template>
