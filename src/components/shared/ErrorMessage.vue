<script setup lang="ts">
defineProps<{
  message: string
}>()

defineEmits<{
  (e: 'retry'): void
}>()
</script>

<template>
  <div class="alert alert-danger text-center py-5 rounded-3 border">
    <i class="bi bi-exclamation-triangle-fill fs-1 mb-3 d-block"></i>
    <p class="fs-5 mb-4">{{ message }}</p>
    <button
      @click="$emit('retry')"
      class="btn btn-indigo d-inline-flex align-items-center gap-2"
    >
      <i class="bi bi-arrow-clockwise"></i>
      <span>Tekrar Deneyin</span>
    </button>
  </div>
</template>
