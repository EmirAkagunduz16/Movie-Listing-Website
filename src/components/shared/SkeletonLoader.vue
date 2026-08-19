<script setup lang="ts">
withDefaults(
  defineProps<{
    count?: number
    type?: 'grid' | 'detail'
  }>(),
  {
    count: 12,
    type: 'grid',
  }
)
</script>

<template>
  <!-- Detail Skeleton -->
  <div v-if="type === 'detail'" class="container py-5">
    <div class="row g-4 align-items-start">
      <div class="col-12 col-md-4">
        <div class="poster-wrapper bg-body-secondary rounded-3 skeleton-pulse"></div>
      </div>
      <div class="col-12 col-md-8">
        <div class="placeholder-glow">
          <span class="placeholder col-3 rounded mb-3 d-block"></span>
          <span class="placeholder col-8 rounded mb-3 d-block" style="height: 2.5rem;"></span>
          <div class="d-flex gap-2 mb-3">
            <span class="placeholder rounded-pill" style="width: 80px; height: 32px;"></span>
            <span class="placeholder rounded-pill" style="width: 110px; height: 32px;"></span>
            <span class="placeholder rounded-pill" style="width: 90px; height: 32px;"></span>
          </div>
          <span class="placeholder col-12 rounded" style="height: 80px;"></span>
        </div>
      </div>
    </div>
  </div>

  <!-- Grid Skeleton -->
  <div v-else class="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 g-3">
    <div
      v-for="i in count"
      :key="i"
      class="col"
    >
      <div class="card border rounded-3 overflow-hidden skeleton-pulse">
        <div class="poster-wrapper bg-body-secondary"></div>
        <div class="card-body p-3">
          <div class="placeholder-glow">
            <span class="placeholder col-9 rounded mb-2"></span>
            <span class="placeholder col-6 rounded"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
