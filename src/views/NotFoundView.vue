<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="d-flex flex-column justify-content-center align-items-center text-center" style="height: 24rem;">
    <i class="bi bi-exclamation-triangle text-warning display-1 mb-4"></i>
    <h1 class="display-4 fw-bold mb-3">404 Not Found</h1>
    <p class="fs-5 mb-4 text-body-secondary">This page does not exist</p>
    <RouterLink to="/" class="btn btn-success px-4 py-2">
      Go Back
    </RouterLink>
  </section>
</template>