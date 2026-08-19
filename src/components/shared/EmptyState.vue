<script setup lang="ts">
withDefaults(
  defineProps<{
    icon?: string
    iconColorClass?: string
    title: string
    description: string
    actionText?: string
    actionTo?: string
    actionIcon?: string
  }>(),
  {
    icon: 'bi-film',
    iconColorClass: 'text-indigo',
    actionText: 'Browse Popular Movies',
    actionTo: '/',
    actionIcon: 'bi-film',
  }
)
</script>

<template>
  <div class="card border rounded-3 text-center py-5 px-4">
    <div class="card-body">
      <div
        class="d-flex align-items-center justify-content-center rounded-3 bg-body-secondary mx-auto mb-3"
        style="width: 64px; height: 64px;"
      >
        <i class="bi fs-3" :class="[icon, iconColorClass]"></i>
      </div>
      <h3 class="fs-5 fw-bold mb-2">{{ title }}</h3>
      <p class="text-body-secondary small mb-4 mx-auto" style="max-width: 400px;">
        {{ description }}
      </p>
      <slot name="action">
        <RouterLink
          v-if="actionText && actionTo"
          :to="actionTo"
          class="btn btn-indigo d-inline-flex align-items-center gap-2"
        >
          <i v-if="actionIcon" class="bi" :class="actionIcon"></i>
          <span>{{ actionText }}</span>
        </RouterLink>
      </slot>
    </div>
  </div>
</template>
