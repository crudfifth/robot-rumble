<template>
  <span class="relative w-full">
    <select
      ref="selectRef"
      class="w-full appearance-none border rounded-8 bg-white pl-4 pr-10 py-[calc(11/16*1rem)] text-oln-16N-100 text-solid-gray-800 focus:outline focus:outline-4 focus:outline-black focus:outline-offset-[calc(2/16*1rem)] focus:ring-[calc(2/16*1rem)] focus:ring-yellow-300 aria-disabled:border-solid-gray-300 aria-disabled:bg-solid-gray-50 aria-disabled:text-solid-gray-420 aria-disabled:pointer-events-none aria-disabled:forced-colors:text-[GrayText] aria-disabled:forced-colors:border-[GrayText]"
      :class="[
        blockSizeStyle[blockSize],
        isError ? 'border-error-1' : 'border-solid-gray-900',
        customClass,
      ]"
      :value="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      :disabled="disabled"
      :aria-disabled="disabled"
      @keydown="disabled ? handleDisabledKeyDown : undefined"
      @mousedown="disabled ? handleDisabledMouseDown : undefined"
    >
      <slot />
    </select>

    <!-- アイコン -->
    <svg
      aria-hidden="true"
      class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
      :class="
        disabled
          ? 'text-solid-gray-420 forced-colors:text-[GrayText]'
          : 'text-solid-gray-900 forced-colors:text-[CanvasText]'
      "
      fill="none"
      height="16"
      width="16"
      viewBox="0 0 16 16"
    >
      <path
        d="M13.3344 4.40002L8.00104 9.73336L2.66771 4.40002L1.73438 5.33336L8.00104 11.6L14.2677 5.33336L13.3344 4.40002Z"
        fill="currentColor"
      />
    </svg>
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type SelectBlockSize = 'lg' | 'md' | 'sm'

const props = defineProps<{
  modelValue: string
  blockSize?: SelectBlockSize
  isError?: boolean
  disabled?: boolean
  class?: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const blockSize = props.blockSize ?? 'lg'

const blockSizeStyle: Record<SelectBlockSize, string> = {
  lg: 'h-14',
  md: 'h-12',
  sm: 'h-10',
}

const customClass = props.class ?? ''

const selectRef = ref<HTMLSelectElement | null>(null)

const handleDisabledKeyDown = (e: KeyboardEvent) => {
  if (e.code !== 'Tab') {
    e.preventDefault()
  }
}

const handleDisabledMouseDown = (e: MouseEvent) => {
  e.preventDefault()
}
</script>
