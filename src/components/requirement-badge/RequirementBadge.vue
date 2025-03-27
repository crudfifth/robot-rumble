<template>
  <span :class="computedClass" v-bind="$attrs">
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  className?: string
  isOptional?: boolean
}>()

const computedClass = computed(() => {
  return `
    text-oln-16N-100
    ${props.isOptional ? 'text-solid-gray-800' : 'text-red-800'}
    ${props.className ?? ''}
  `
})
</script>
