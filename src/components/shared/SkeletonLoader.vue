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
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
    <div
      v-for="i in count"
      :key="i"
      class="bg-gray-900 rounded-xl overflow-hidden animate-pulse border border-gray-800"
    >
      <div class="aspect-2/3 bg-gray-800"></div>
      <div class="p-3 space-y-2">
        <div class="h-4 bg-gray-800 rounded w-3/4"></div>
        <div class="h-3 bg-gray-800 rounded w-1/2"></div>
      </div>
    </div>
  </div>
</template>
