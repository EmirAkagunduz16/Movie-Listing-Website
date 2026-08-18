<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
}>()
</script>

<template>
  <section class="hero-section border-bottom bg-dark text-white">
    <div class="hero-bg"></div>
    <div class="position-relative container py-5">
      <div style="max-width: 640px;">
        <p class="text-indigo small fw-semibold text-uppercase ls-wide mb-2" style="letter-spacing: 0.15em;">Discover</p>
        <h1 class="display-5 fw-bold mb-3 lh-sm">
          {{ title }}
        </h1>
        <p class="text-white-50 fs-6 lh-base">
          {{ subtitle }}
        </p>
      </div>
    </div>
  </section>
</template>
