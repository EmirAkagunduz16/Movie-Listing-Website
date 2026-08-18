<script setup lang="ts">
withDefaults(
  defineProps<{
    count?: number
  }>(),
  {
    count: 12,
  }
)
</script>

<template>
  <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 g-3">
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
