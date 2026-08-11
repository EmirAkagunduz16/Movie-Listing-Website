<script setup lang="ts">
import { ArrowPathIcon } from '@heroicons/vue/24/solid'

defineProps<{
  message: string
}>()

defineEmits<{
  (e: 'retry'): void
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 bg-gray-900/50 rounded-2xl border border-gray-800">
    <p class="text-red-400 text-lg mb-4">{{ message }}</p>
    <button
      @click="$emit('retry')"
      class="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-medium transition-colors"
    >
      <ArrowPathIcon class="size-4" />
      <span>Tekrar Deneyin</span>
    </button>
  </div>
</template>
