<template>
  <button :class="buttonClasses" :aria-disabled="disabled" @click="handleClick">
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  text: string
  variant?: 'solid-fill' | 'outline' | 'text'
  size?: 'lg' | 'md' | 'sm' | 'xs'
  disabled?: boolean
  onClick?: () => void
}>()

const variantClasses = {
  'solid-fill':
    'border-4 border-double border-transparent bg-blue-900 text-white hover:bg-blue-1000 hover:underline active:bg-blue-1200 active:underline aria-disabled:bg-solid-gray-300 aria-disabled:text-solid-gray-50',
  outline:
    'border border-current bg-white text-blue-900 hover:bg-blue-200 hover:text-blue-1000 hover:underline active:bg-blue-300 active:text-blue-1200 active:underline aria-disabled:bg-white aria-disabled:text-solid-gray-300',
  text: 'text-blue-900 underline hover:bg-blue-50 hover:text-blue-1000 hover:decoration-[calc(3/16*1rem)] active:bg-blue-100 active:text-blue-1200 focus-visible:bg-yellow-300 aria-disabled:bg-transparent aria-disabled:focus-visible:bg-yellow-300 aria-disabled:text-solid-gray-300',
}

const sizeClasses = {
  lg: 'min-w-[calc(136/16*1rem)] min-h-14 rounded-8 px-4 py-3 text-oln-16B-100',
  md: 'min-w-24 min-h-12 rounded-8 px-4 py-2 text-oln-16B-100',
  sm: 'relative min-w-20 min-h-9 rounded-6 px-3 py-0.5 text-oln-16B-100 after:absolute after:inset-x-0 after:-inset-y-full after:m-auto after:h-[44px]',
  xs: 'relative min-w-18 min-h-7 rounded-4 px-2 py-0.5 text-oln-14B-100 after:absolute after:inset-x-0 after:-inset-y-full after:m-auto after:h-[44px]',
}

const buttonClasses = computed(() => {
  const variantClass = variantClasses[props.variant || 'solid-fill']
  const sizeClass = sizeClasses[props.size || 'md']
  return `${variantClass} ${sizeClass}`
})

const handleClick = () => {
  if (!props.disabled && props.onClick) {
    props.onClick()
  }
}
</script>
